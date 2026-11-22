import { useState, useEffect, useMemo, useCallback } from "react";
import analyticsService from "../../services/analyticsService";

// Helper to format relative time
const getRelativeTime = (dateObj) => {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return "Just now";
  }
  const diffSec = Math.floor((Date.now() - dateObj.getTime()) / 1000);
  if (diffSec < 60) return `${diffSec <= 5 ? "Just now" : diffSec + "s ago"}`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return dateObj.toLocaleDateString();
};

// Event badge configurations
const EVENT_BADGES = {
  visit: {
    label: "Page Visit",
    bg: "rgba(59, 130, 246, 0.12)",
    color: "#2563eb",
    icon: "bi-eye"
  },
  resume_download: {
    label: "Resume Download",
    bg: "rgba(16, 185, 129, 0.15)",
    color: "#059669",
    icon: "bi-file-earmark-pdf-fill"
  },
  demo_click: {
    label: "Demo Click",
    bg: "rgba(255, 107, 0, 0.15)",
    color: "#ff6b00",
    icon: "bi-arrow-up-right-circle-fill"
  },
  repo_click: {
    label: "GitHub Click",
    bg: "rgba(147, 51, 234, 0.14)",
    color: "#7e22ce",
    icon: "bi-github"
  }
};

const AnalyticsDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d"); // 'today', '7d', '30d', 'all'
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredChartPoint, setHoveredChartPoint] = useState(null);
  const [actionNotice, setActionNotice] = useState("");

  const showNotice = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(""), 3500);
  };

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await analyticsService.fetchEvents(1000);
      setEvents(data);
    } catch (err) {
      console.error("Error loading analytics:", err);
      showNotice("Failed to load analytics data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  // Filter events by selected time range
  const filteredEventsByTime = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    return events.filter((ev) => {
      const evDateStr = ev.date || (ev.createdAt?.toISOString().slice(0, 10));
      if (!evDateStr) return true;

      if (timeRange === "today") {
        return evDateStr === todayStr;
      }
      if (timeRange === "7d") {
        const past7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return ev.createdAt ? ev.createdAt >= past7Days : true;
      }
      if (timeRange === "30d") {
        const past30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return ev.createdAt ? ev.createdAt >= past30Days : true;
      }
      return true; // 'all'
    });
  }, [events, timeRange]);

  // Overall KPI statistics
  const stats = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayEvents = events.filter((ev) => (ev.date || ev.createdAt?.toISOString().slice(0, 10)) === todayStr);

    const visitsInPeriod = filteredEventsByTime.filter((ev) => ev.type === "visit");
    const uniqueVisitorsCount = new Set(
      filteredEventsByTime.map((ev) => ev.visitor?.visitorId || ev.visitor?.ip).filter(Boolean)
    ).size;

    const resumeInPeriod = filteredEventsByTime.filter((ev) => ev.type === "resume_download");
    const todayResume = todayEvents.filter((ev) => ev.type === "resume_download").length;

    const demoInPeriod = filteredEventsByTime.filter((ev) => ev.type === "demo_click");
    const todayDemo = todayEvents.filter((ev) => ev.type === "demo_click").length;

    const repoInPeriod = filteredEventsByTime.filter((ev) => ev.type === "repo_click");
    const todayRepo = todayEvents.filter((ev) => ev.type === "repo_click").length;

    const todayVisits = todayEvents.filter((ev) => ev.type === "visit").length;

    return {
      totalVisits: visitsInPeriod.length,
      todayVisits,
      uniqueVisitors: uniqueVisitorsCount,
      totalResumeDownloads: resumeInPeriod.length,
      todayResumeDownloads: todayResume,
      totalDemoClicks: demoInPeriod.length,
      todayDemoClicks: todayDemo,
      totalRepoClicks: repoInPeriod.length,
      todayRepoClicks: todayRepo,
      totalEvents: filteredEventsByTime.length
    };
  }, [events, filteredEventsByTime]);

  // Generate Daily Trend data for SVG Chart
  const chartDays = useMemo(() => {
    const daysCount = timeRange === "today" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 14 : 14;
    const days = [];
    const now = new Date();

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      const dayEvents = events.filter((ev) => (ev.date || ev.createdAt?.toISOString().slice(0, 10)) === dateStr);
      const visits = dayEvents.filter((ev) => ev.type === "visit").length;
      const downloads = dayEvents.filter((ev) => ev.type === "resume_download").length;
      const demoClicks = dayEvents.filter((ev) => ev.type === "demo_click").length;
      const repoClicks = dayEvents.filter((ev) => ev.type === "repo_click").length;
      const totalClicks = demoClicks + repoClicks;

      days.push({
        dateStr,
        label,
        visits,
        downloads,
        totalClicks,
        demoClicks,
        repoClicks,
        total: visits + downloads + totalClicks
      });
    }

    return days;
  }, [events, timeRange]);

  // Project engagement rankings (Demo vs GitHub repo clicks)
  const projectMetrics = useMemo(() => {
    const map = {};
    filteredEventsByTime.forEach((ev) => {
      if (ev.type === "demo_click" || ev.type === "repo_click") {
        const name = ev.target || ev.metadata?.projectName || "Unnamed Project";
        if (!map[name]) {
          map[name] = { name, demoClicks: 0, repoClicks: 0, total: 0 };
        }
        if (ev.type === "demo_click") map[name].demoClicks += 1;
        if (ev.type === "repo_click") map[name].repoClicks += 1;
        map[name].total += 1;
      }
    });
    return Object.values(map).sort((a, b) => b.total - a.total);
  }, [filteredEventsByTime]);

  // Geographic breakdowns (Countries & Cities)
  const geoBreakdown = useMemo(() => {
    const countries = {};
    const cities = {};

    filteredEventsByTime.forEach((ev) => {
      const country = ev.visitor?.country || "Unknown";
      const flag = ev.visitor?.flag || "🌐";
      const city = ev.visitor?.city;

      if (!countries[country]) {
        countries[country] = { country, flag, count: 0 };
      }
      countries[country].count += 1;

      if (city && city !== "Unknown") {
        const cityKey = `${city}, ${country}`;
        cities[cityKey] = (cities[cityKey] || 0) + 1;
      }
    });

    const sortedCountries = Object.values(countries).sort((a, b) => b.count - a.count);
    const sortedCities = Object.entries(cities)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    return { countries: sortedCountries, cities: sortedCities };
  }, [filteredEventsByTime]);

  // Technology breakdowns (Devices, Browsers, Referrers)
  const techBreakdown = useMemo(() => {
    const devices = { Desktop: 0, Mobile: 0, Tablet: 0 };
    const browsers = {};
    const referrers = {};

    filteredEventsByTime.forEach((ev) => {
      const dev = ev.visitor?.device || "Desktop";
      if (devices[dev] !== undefined) devices[dev] += 1;
      else devices.Desktop += 1;

      const br = ev.visitor?.browser || "Other";
      browsers[br] = (browsers[br] || 0) + 1;

      let ref = ev.visitor?.referrer || "Direct";
      if (ref && ref.startsWith("http")) {
        try {
          ref = new URL(ref).hostname.replace(/^www\./, "");
        } catch {
          // ignore
        }
      }
      referrers[ref] = (referrers[ref] || 0) + 1;
    });

    const totalDev = devices.Desktop + devices.Mobile + devices.Tablet || 1;
    const sortedBrowsers = Object.entries(browsers)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    const sortedReferrers = Object.entries(referrers)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return {
      devices,
      devicePercentages: {
        Desktop: Math.round((devices.Desktop / totalDev) * 100),
        Mobile: Math.round((devices.Mobile / totalDev) * 100),
        Tablet: Math.round((devices.Tablet / totalDev) * 100)
      },
      browsers: sortedBrowsers,
      referrers: sortedReferrers
    };
  }, [filteredEventsByTime]);

  // Table items filtered by search and event type
  const tableEvents = useMemo(() => {
    return filteredEventsByTime.filter((ev) => {
      // Filter by type
      if (eventTypeFilter !== "all" && ev.type !== eventTypeFilter) {
        return false;
      }
      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const ip = ev.visitor?.ip?.toLowerCase() || "";
        const country = ev.visitor?.country?.toLowerCase() || "";
        const city = ev.visitor?.city?.toLowerCase() || "";
        const isp = ev.visitor?.isp?.toLowerCase() || "";
        const target = ev.target?.toLowerCase() || "";
        const ref = ev.visitor?.referrer?.toLowerCase() || "";
        const proj = ev.metadata?.projectName?.toLowerCase() || "";

        return (
          ip.includes(q) ||
          country.includes(q) ||
          city.includes(q) ||
          isp.includes(q) ||
          target.includes(q) ||
          ref.includes(q) ||
          proj.includes(q)
        );
      }
      return true;
    });
  }, [filteredEventsByTime, eventTypeFilter, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(tableEvents.length / itemsPerPage) || 1;
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return tableEvents.slice(start, start + itemsPerPage);
  }, [tableEvents, currentPage, itemsPerPage]);

  // CSV Export
  const handleExportCSV = () => {
    if (tableEvents.length === 0) {
      alert("No events available to export.");
      return;
    }
    const headers = [
      "Timestamp",
      "Date",
      "Event Type",
      "Target / Details",
      "IP Address",
      "City",
      "Region",
      "Country",
      "ISP",
      "Device",
      "OS",
      "Browser",
      "Referrer"
    ];

    const rows = tableEvents.map((ev) => [
      ev.createdAt ? ev.createdAt.toISOString() : ev.clientTime || "",
      ev.date || "",
      ev.type || "",
      `"${(ev.target || "").replace(/"/g, '""')}"`,
      ev.visitor?.ip || "Anonymous",
      `"${(ev.visitor?.city || "").replace(/"/g, '""')}"`,
      `"${(ev.visitor?.region || "").replace(/"/g, '""')}"`,
      `"${(ev.visitor?.country || "").replace(/"/g, '""')}"`,
      `"${(ev.visitor?.isp || "").replace(/"/g, '""')}"`,
      ev.visitor?.device || "",
      ev.visitor?.os || "",
      ev.visitor?.browser || "",
      `"${(ev.visitor?.referrer || "").replace(/"/g, '""')}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `portfolio_analytics_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice("Analytics CSV exported successfully!");
  };

  // Delete event
  const handleDeleteEvent = async (evId) => {
    if (window.confirm("Delete this analytics log entry?")) {
      await analyticsService.deleteEvent(evId);
      setEvents((prev) => prev.filter((e) => e.id !== evId));
      if (selectedEvent?.id === evId) setSelectedEvent(null);
      showNotice("Log entry deleted.");
    }
  };

  // Clear all events
  const handleClearAll = async () => {
    if (
      window.confirm(
        "Are you sure you want to permanently clear ALL analytics events? This action cannot be undone."
      )
    ) {
      await analyticsService.clearAllEvents(events);
      setEvents([]);
      setSelectedEvent(null);
      showNotice("All analytics events cleared.");
    }
  };

  // SVG Chart calculation parameters
  const maxDayVal = Math.max(...chartDays.map((d) => Math.max(d.visits, d.downloads, d.totalClicks)), 4);
  const chartHeight = 160;
  const chartWidth = 500;

  return (
    <div className="d-flex flex-column gap-4">
      {/* Action Notification Alert */}
      {actionNotice && (
        <div className="alert alert-success alert-dismissible fade show shadow-sm mb-0 py-2 px-3 small d-flex align-items-center justify-content-between" role="alert">
          <span><i className="bi bi-check-circle-fill me-2"></i>{actionNotice}</span>
          <button type="button" className="btn-close py-2" onClick={() => setActionNotice("")} aria-label="Close"></button>
        </div>
      )}

      {/* Header & Controls Toolbar */}
      <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-warning text-dark px-2 py-1 fs-6">
                <i className="bi bi-graph-up-arrow me-1"></i> Analytics
              </span>
              <span className="text-muted small">Real-Time Visitor & Click Tracker</span>
            </div>
            <h4 className="fw-bold mb-0 mt-2 text-dark">Portfolio Activity & Engagement</h4>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            {/* Time range selector */}
            <div className="btn-group btn-group-sm" role="group">
              <button
                type="button"
                className={`btn ${timeRange === "today" ? "btn-dark fw-semibold" : "btn-outline-secondary"}`}
                onClick={() => { setTimeRange("today"); setCurrentPage(1); }}
              >
                Today
              </button>
              <button
                type="button"
                className={`btn ${timeRange === "7d" ? "btn-dark fw-semibold" : "btn-outline-secondary"}`}
                onClick={() => { setTimeRange("7d"); setCurrentPage(1); }}
              >
                7 Days
              </button>
              <button
                type="button"
                className={`btn ${timeRange === "30d" ? "btn-dark fw-semibold" : "btn-outline-secondary"}`}
                onClick={() => { setTimeRange("30d"); setCurrentPage(1); }}
              >
                30 Days
              </button>
              <button
                type="button"
                className={`btn ${timeRange === "all" ? "btn-dark fw-semibold" : "btn-outline-secondary"}`}
                onClick={() => { setTimeRange("all"); setCurrentPage(1); }}
              >
                All Time
              </button>
            </div>

            {/* Refresh */}
            <button
              className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
              onClick={loadAnalytics}
              disabled={loading}
              title="Refresh Analytics Data"
            >
              <i className={`bi bi-arrow-clockwise ${loading ? "spinner-border spinner-border-sm" : ""}`}></i>
              <span className="d-none d-sm-inline">Refresh</span>
            </button>

            {/* Export CSV */}
            <button
              className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
              onClick={handleExportCSV}
              disabled={events.length === 0}
              title="Export Analytics to CSV"
            >
              <i className="bi bi-file-earmark-spreadsheet"></i>
              <span className="d-none d-sm-inline">Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="row g-2 g-sm-3">
        {/* Daily & Total Visits */}
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 rounded-3 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-muted small fw-medium">Daily / Total Visits</span>
                <div className="fs-3 fs-md-2 fw-bold text-primary mt-1">
                  {stats.totalVisits}
                </div>
              </div>
              <div
                className="p-2 rounded-circle text-primary"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.12)" }}
              >
                <i className="bi bi-eye-fill fs-5"></i>
              </div>
            </div>
            <div className="mt-2 small text-muted d-flex align-items-center gap-2">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                Today: {stats.todayVisits}
              </span>
              <span className="text-truncate">
                Unique: <strong>{stats.uniqueVisitors}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Resume Downloads */}
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 rounded-3 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-muted small fw-medium">Resume Downloads</span>
                <div className="fs-3 fs-md-2 fw-bold text-success mt-1">
                  {stats.totalResumeDownloads}
                </div>
              </div>
              <div
                className="p-2 rounded-circle text-success"
                style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
              >
                <i className="bi bi-file-earmark-arrow-down-fill fs-5"></i>
              </div>
            </div>
            <div className="mt-2 small text-muted">
              <span className="badge bg-success-subtle text-success border border-success-subtle">
                Today: {stats.todayResumeDownloads}
              </span>
            </div>
          </div>
        </div>

        {/* Demo Link Clicks */}
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 rounded-3 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-muted small fw-medium">Live Demo Clicks</span>
                <div className="fs-3 fs-md-2 fw-bold mt-1" style={{ color: "#ff6b00" }}>
                  {stats.totalDemoClicks}
                </div>
              </div>
              <div
                className="p-2 rounded-circle"
                style={{ backgroundColor: "rgba(255, 107, 0, 0.15)", color: "#ff6b00" }}
              >
                <i className="bi bi-arrow-up-right-circle-fill fs-5"></i>
              </div>
            </div>
            <div className="mt-2 small text-muted">
              <span className="badge border" style={{ backgroundColor: "rgba(255, 107, 0, 0.1)", color: "#ff6b00" }}>
                Today: {stats.todayDemoClicks}
              </span>
            </div>
          </div>
        </div>

        {/* GitHub Repo Clicks */}
        <div className="col-6 col-lg-3">
          <div className="card border-0 shadow-sm p-3 rounded-3 bg-white h-100 position-relative overflow-hidden">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-muted small fw-medium">GitHub Repo Clicks</span>
                <div className="fs-3 fs-md-2 fw-bold text-dark mt-1">
                  {stats.totalRepoClicks}
                </div>
              </div>
              <div
                className="p-2 rounded-circle text-dark"
                style={{ backgroundColor: "rgba(15, 23, 42, 0.1)" }}
              >
                <i className="bi bi-github fs-5"></i>
              </div>
            </div>
            <div className="mt-2 small text-muted">
              <span className="badge bg-dark-subtle text-dark border border-dark-subtle">
                Today: {stats.todayRepoClicks}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Chart & Project Performance Section */}
      <div className="row g-3">
        {/* SVG Daily Trend Chart */}
        <div className="col-12 col-xl-7">
          <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Daily Engagement Trends</h6>
                <span className="text-muted small">Visits, Downloads & Clicks comparison</span>
              </div>
              <div className="d-flex align-items-center gap-3 small">
                <span className="d-flex align-items-center gap-1">
                  <span className="d-inline-block rounded-circle" style={{ width: 10, height: 10, backgroundColor: "#2563eb" }}></span>
                  Visits
                </span>
                <span className="d-flex align-items-center gap-1">
                  <span className="d-inline-block rounded-circle" style={{ width: 10, height: 10, backgroundColor: "#059669" }}></span>
                  Resume
                </span>
                <span className="d-flex align-items-center gap-1">
                  <span className="d-inline-block rounded-circle" style={{ width: 10, height: 10, backgroundColor: "#ff6b00" }}></span>
                  Clicks
                </span>
              </div>
            </div>

            {/* SVG Chart Container */}
            <div className="position-relative pt-2" style={{ overflowX: "auto" }}>
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight + 35}`}
                className="w-100"
                style={{ minWidth: 420, maxHeight: 220 }}
              >
                {/* Horizontal reference grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                  const y = chartHeight - pct * (chartHeight - 20) + 10;
                  return (
                    <g key={idx}>
                      <line
                        x1="25"
                        y1={y}
                        x2={chartWidth - 10}
                        y2={y}
                        stroke="#f1f5f9"
                        strokeWidth="1"
                        strokeDasharray={pct === 0 ? "0" : "3,3"}
                      />
                      <text x="18" y={y + 3} fontSize="9" fill="#94a3b8" textAnchor="end">
                        {Math.round(pct * maxDayVal)}
                      </text>
                    </g>
                  );
                })}

                {/* Day Bars */}
                {chartDays.map((d, idx) => {
                  const x = 35 + idx * ((chartWidth - 50) / chartDays.length);
                  const barAreaWidth = (chartWidth - 50) / chartDays.length;
                  const barWidth = Math.max(Math.min(barAreaWidth / 3.8, 14), 4);

                  const visitH = (d.visits / maxDayVal) * (chartHeight - 25);
                  const resumeH = (d.downloads / maxDayVal) * (chartHeight - 25);
                  const clicksH = (d.totalClicks / maxDayVal) * (chartHeight - 25);

                  const yBottom = chartHeight + 10;

                  return (
                    <g
                      key={idx}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredChartPoint(d)}
                      onMouseLeave={() => setHoveredChartPoint(null)}
                    >
                      {/* Active highlight background column */}
                      <rect
                        x={x - 2}
                        y={10}
                        width={barAreaWidth}
                        height={chartHeight}
                        fill={hoveredChartPoint?.dateStr === d.dateStr ? "rgba(255, 107, 0, 0.06)" : "transparent"}
                        rx="4"
                      />

                      {/* Visits Bar */}
                      <rect
                        x={x + 2}
                        y={yBottom - Math.max(visitH, 2)}
                        width={barWidth}
                        height={Math.max(visitH, 2)}
                        fill="#2563eb"
                        rx="2"
                      />

                      {/* Resume Downloads Bar */}
                      <rect
                        x={x + 2 + barWidth + 2}
                        y={yBottom - Math.max(resumeH, 2)}
                        width={barWidth}
                        height={Math.max(resumeH, 2)}
                        fill="#059669"
                        rx="2"
                      />

                      {/* Clicks Bar */}
                      <rect
                        x={x + 2 + (barWidth + 2) * 2}
                        y={yBottom - Math.max(clicksH, 2)}
                        width={barWidth}
                        height={Math.max(clicksH, 2)}
                        fill="#ff6b00"
                        rx="2"
                      />

                      {/* Date label */}
                      <text
                        x={x + barAreaWidth / 2 - 4}
                        y={chartHeight + 28}
                        fontSize="9.5"
                        fill="#64748b"
                        textAnchor="middle"
                      >
                        {d.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Hover Tooltip Box */}
              {hoveredChartPoint && (
                <div
                  className="card p-2 shadow border-0 position-absolute rounded-3 small"
                  style={{
                    top: 10,
                    right: 15,
                    backgroundColor: "rgba(15, 23, 42, 0.94)",
                    color: "#fff",
                    zIndex: 10,
                    minWidth: 160
                  }}
                >
                  <div className="fw-bold mb-1 border-bottom pb-1 border-secondary">
                    {hoveredChartPoint.label} ({hoveredChartPoint.dateStr})
                  </div>
                  <div className="d-flex justify-content-between gap-3 text-info">
                    <span>Visits:</span>
                    <strong>{hoveredChartPoint.visits}</strong>
                  </div>
                  <div className="d-flex justify-content-between gap-3 text-success">
                    <span>Resume Downloads:</span>
                    <strong>{hoveredChartPoint.downloads}</strong>
                  </div>
                  <div className="d-flex justify-content-between gap-3" style={{ color: "#ff8533" }}>
                    <span>Demo Clicks:</span>
                    <strong>{hoveredChartPoint.demoClicks}</strong>
                  </div>
                  <div className="d-flex justify-content-between gap-3 text-light">
                    <span>GitHub Clicks:</span>
                    <strong>{hoveredChartPoint.repoClicks}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Link Click Performance */}
        <div className="col-12 col-xl-5">
          <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 className="fw-bold mb-0 text-dark">Top Project Clicks</h6>
                <span className="text-muted small">Live Demo vs GitHub interest</span>
              </div>
              <span className="badge bg-light text-muted border">
                {projectMetrics.length} Projects
              </span>
            </div>

            {projectMetrics.length === 0 ? (
              <div className="text-center py-4 text-muted small">
                <i className="bi bi-cursor fs-3 d-block mb-2 text-secondary opacity-50"></i>
                No project clicks recorded yet in this time range.
              </div>
            ) : (
              <div className="d-flex flex-column gap-3 overflow-auto" style={{ maxHeight: 240 }}>
                {projectMetrics.slice(0, 5).map((proj, idx) => {
                  const maxProjClicks = projectMetrics[0]?.total || 1;
                  const pct = Math.round((proj.total / maxProjClicks) * 100);
                  return (
                    <div key={idx} className="border-bottom pb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-semibold text-truncate small me-2" style={{ maxWidth: "60%" }}>
                          {idx + 1}. {proj.name}
                        </span>
                        <div className="small d-flex gap-2">
                          <span className="badge rounded-pill" style={{ backgroundColor: "rgba(255, 107, 0, 0.12)", color: "#ff6b00" }}>
                            <i className="bi bi-play-circle me-1"></i>{proj.demoClicks} Demo
                          </span>
                          <span className="badge bg-secondary-subtle text-secondary rounded-pill">
                            <i className="bi bi-github me-1"></i>{proj.repoClicks} Git
                          </span>
                        </div>
                      </div>
                      <div className="progress" style={{ height: 6 }}>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: `${pct}%`, backgroundColor: "#ff6b00" }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Geographic & Technology Breakdown */}
      <div className="row g-3">
        {/* Countries & Cities */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white h-100">
            <h6 className="fw-bold mb-1 text-dark">
              <i className="bi bi-geo-alt me-1 text-danger"></i> Geographic Locations
            </h6>
            <span className="text-muted small mb-3 d-block">Where visitors are browsing from</span>

            {geoBreakdown.countries.length === 0 ? (
              <div className="text-center py-4 text-muted small">No visitor location data yet.</div>
            ) : (
              <div className="d-flex flex-column gap-2 overflow-auto" style={{ maxHeight: 200 }}>
                {geoBreakdown.countries.slice(0, 6).map((c, i) => {
                  const maxCountryCount = geoBreakdown.countries[0]?.count || 1;
                  const pct = Math.round((c.count / maxCountryCount) * 100);
                  return (
                    <div key={i}>
                      <div className="d-flex justify-content-between align-items-center small mb-1">
                        <span className="d-flex align-items-center gap-2">
                          <span className="fs-5 leading-none">{c.flag}</span>
                          <span className="fw-medium">{c.country}</span>
                        </span>
                        <span className="fw-bold text-dark">{c.count}</span>
                      </div>
                      <div className="progress" style={{ height: 4 }}>
                        <div className="progress-bar bg-primary" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Devices & Browsers */}
        <div className="col-12 col-md-6 col-xl-4">
          <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white h-100">
            <h6 className="fw-bold mb-1 text-dark">
              <i className="bi bi-display me-1 text-primary"></i> Devices & Browsers
            </h6>
            <span className="text-muted small mb-3 d-block">Visitor hardware & client platforms</span>

            {/* Device Percentages */}
            <div className="row text-center mb-3 g-2">
              <div className="col-4">
                <div className="p-2 border rounded-2 bg-light">
                  <i className="bi bi-laptop text-primary fs-5 d-block"></i>
                  <div className="fw-bold small">{techBreakdown.devicePercentages.Desktop}%</div>
                  <div className="text-muted" style={{ fontSize: "0.72rem" }}>Desktop</div>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2 border rounded-2 bg-light">
                  <i className="bi bi-phone text-success fs-5 d-block"></i>
                  <div className="fw-bold small">{techBreakdown.devicePercentages.Mobile}%</div>
                  <div className="text-muted" style={{ fontSize: "0.72rem" }}>Mobile</div>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2 border rounded-2 bg-light">
                  <i className="bi bi-tablet text-warning fs-5 d-block"></i>
                  <div className="fw-bold small">{techBreakdown.devicePercentages.Tablet}%</div>
                  <div className="text-muted" style={{ fontSize: "0.72rem" }}>Tablet</div>
                </div>
              </div>
            </div>

            {/* Top Browsers */}
            <div className="d-flex flex-wrap gap-1 mt-auto">
              {techBreakdown.browsers.slice(0, 4).map((b, i) => (
                <span key={i} className="badge bg-light text-dark border py-1 px-2 small">
                  {b.name}: {b.count}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Top Referrers */}
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm p-3 p-md-4 rounded-3 bg-white h-100">
            <h6 className="fw-bold mb-1 text-dark">
              <i className="bi bi-signpost me-1 text-info"></i> Traffic Sources / Referrers
            </h6>
            <span className="text-muted small mb-3 d-block">Where your visitors discovered you</span>

            {techBreakdown.referrers.length === 0 ? (
              <div className="text-center py-4 text-muted small">No referrer sources recorded.</div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {techBreakdown.referrers.map((r, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center small border-bottom pb-1">
                    <span className="text-truncate fw-medium" style={{ maxWidth: "80%" }}>
                      <i className="bi bi-link-45deg me-1 text-muted"></i>
                      {r.name}
                    </span>
                    <span className="badge bg-light text-dark border">{r.count} visits</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* "Who Visits, Who Clicks" Real-Time Activity Log */}
      <div className="card border-0 shadow-sm rounded-3 bg-white overflow-hidden">
        <div className="p-3 p-md-4 border-bottom bg-white">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <h5 className="fw-bold mb-1 text-dark">
                <i className="bi bi-clock-history me-2 text-warning"></i>
                Visitor Activity Log ("Who Visits, Who Clicks")
              </h5>
              <div className="text-muted small">
                Showing {tableEvents.length} events • Real-time granular logs with IP, location, device & target
              </div>
            </div>

            {/* Filter controls & Search */}
            <div className="d-flex flex-wrap align-items-center gap-2">
              {/* Type Filter */}
              <select
                className="form-select form-select-sm"
                style={{ width: "auto" }}
                value={eventTypeFilter}
                onChange={(e) => {
                  setEventTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Event Types</option>
                <option value="visit">Page Visits Only</option>
                <option value="resume_download">Resume Downloads Only</option>
                <option value="demo_click">Live Demo Clicks Only</option>
                <option value="repo_click">GitHub Clicks Only</option>
              </select>

              {/* Search */}
              <div className="input-group input-group-sm" style={{ width: 220 }}>
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search IP, City, Project..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Clear all logs button */}
              {events.length > 0 && (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleClearAll}
                  title="Clear All Analytics Logs"
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.86rem" }}>
            <thead className="table-light text-muted small">
              <tr>
                <th style={{ width: 140 }}>When</th>
                <th style={{ width: 160 }}>Event</th>
                <th>Target / Details</th>
                <th>Visitor & IP</th>
                <th>Location</th>
                <th>Device & Client</th>
                <th style={{ width: 60 }} className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <div className="spinner-border text-primary spinner-border-sm me-2" role="status"></div>
                    Loading analytics data...
                  </td>
                </tr>
              ) : paginatedEvents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-2 d-block mb-2 text-secondary opacity-50"></i>
                    No events found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedEvents.map((ev) => {
                  const badge = EVENT_BADGES[ev.type] || {
                    label: ev.type,
                    bg: "rgba(100, 116, 139, 0.12)",
                    color: "#475569",
                    icon: "bi-circle"
                  };
                  const dateObj = ev.createdAt || (ev.clientTime ? new Date(ev.clientTime) : null);
                  const relTime = getRelativeTime(dateObj);
                  const fullTime = dateObj ? dateObj.toLocaleString() : "Unknown time";

                  return (
                    <tr key={ev.id}>
                      {/* Time */}
                      <td className="text-nowrap" title={fullTime}>
                        <div className="fw-semibold text-dark">{relTime}</div>
                        <div className="text-muted" style={{ fontSize: "0.72rem" }}>
                          {ev.date || (dateObj ? dateObj.toLocaleDateString() : "")}
                        </div>
                      </td>

                      {/* Event Badge */}
                      <td>
                        <span
                          className="badge d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill"
                          style={{ backgroundColor: badge.bg, color: badge.color }}
                        >
                          <i className={`bi ${badge.icon}`}></i>
                          {badge.label}
                        </span>
                      </td>

                      {/* Target / Details */}
                      <td>
                        <div className="fw-semibold text-dark text-break">
                          {ev.target === "portfolio_home" ? (
                            <span className="text-muted">Home Showcase</span>
                          ) : ev.target === "resume_pdf" ? (
                            <span className="text-success">
                              <i className="bi bi-file-pdf me-1"></i>Vitthal Khemnar - Resume
                              {ev.metadata?.source && (
                                <span className="badge bg-light text-muted ms-1 border">
                                  via {ev.metadata.source}
                                </span>
                              )}
                            </span>
                          ) : (
                            ev.target
                          )}
                        </div>
                        {ev.metadata?.url && (
                          <div className="text-truncate text-muted" style={{ maxWidth: 220, fontSize: "0.72rem" }}>
                            {ev.metadata.url}
                          </div>
                        )}
                      </td>

                      {/* Visitor IP & ISP */}
                      <td>
                        <div className="font-monospace fw-medium text-dark">
                          {ev.visitor?.ip || "Anonymous"}
                        </div>
                        <div className="text-muted text-truncate" style={{ maxWidth: 160, fontSize: "0.72rem" }}>
                          {ev.visitor?.isp || "Network"}
                        </div>
                      </td>

                      {/* Location (City & Country with Flag) */}
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <span className="fs-6 leading-none">{ev.visitor?.flag || "🌐"}</span>
                          <span className="fw-medium text-dark">
                            {ev.visitor?.city && ev.visitor?.city !== "Unknown"
                              ? `${ev.visitor.city}, `
                              : ""}
                            {ev.visitor?.country || "Unknown"}
                          </span>
                        </div>
                        {ev.visitor?.region && (
                          <div className="text-muted text-truncate" style={{ maxWidth: 140, fontSize: "0.72rem" }}>
                            {ev.visitor.region}
                          </div>
                        )}
                      </td>

                      {/* Device & Browser */}
                      <td>
                        <div className="small text-dark d-flex align-items-center gap-1">
                          <i
                            className={`bi ${
                              ev.visitor?.device === "Mobile"
                                ? "bi-phone"
                                : ev.visitor?.device === "Tablet"
                                ? "bi-tablet"
                                : "bi-laptop"
                            } text-muted`}
                          ></i>
                          <span>{ev.visitor?.device || "Desktop"}</span>
                          <span className="text-muted">•</span>
                          <span>{ev.visitor?.browser || "Browser"}</span>
                        </div>
                        <div className="text-muted" style={{ fontSize: "0.72rem" }}>
                          {ev.visitor?.os || "OS"} • Ref: {ev.visitor?.referrer === "Direct" ? "Direct" : "External"}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="text-center">
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-light btn-sm text-secondary"
                            onClick={() => setSelectedEvent(ev)}
                            title="View Full Visitor Details"
                          >
                            <i className="bi bi-info-circle"></i>
                          </button>
                          <button
                            className="btn btn-light btn-sm text-danger"
                            onClick={() => handleDeleteEvent(ev.id)}
                            title="Delete Entry"
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-3 border-top bg-light d-flex justify-content-between align-items-center">
            <span className="small text-muted">
              Page {currentPage} of {totalPages} ({tableEvents.length} total events)
            </span>
            <div className="btn-group btn-group-sm">
              <button
                className="btn btn-outline-secondary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <button
                className="btn btn-outline-secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal / Inspector for Detailed Visitor Payload */}
      {selectedEvent && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-3 border-0 shadow-lg">
              <div className="modal-header bg-dark text-white py-3">
                <h5 className="modal-title fw-bold">
                  <i className="bi bi-shield-check text-warning me-2"></i>
                  Visitor Detail Inspector
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedEvent(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="p-3 rounded-2 bg-light border">
                      <div className="fw-bold mb-2 text-dark">Event Information</div>
                      <div className="small mb-1"><strong>Type:</strong> {selectedEvent.type}</div>
                      <div className="small mb-1"><strong>Target:</strong> {selectedEvent.target}</div>
                      <div className="small mb-1"><strong>Date:</strong> {selectedEvent.date}</div>
                      <div className="small mb-1">
                        <strong>Timestamp:</strong>{" "}
                        {selectedEvent.createdAt ? selectedEvent.createdAt.toString() : selectedEvent.clientTime}
                      </div>
                      {selectedEvent.metadata && Object.keys(selectedEvent.metadata).length > 0 && (
                        <div className="small mt-2 pt-2 border-top">
                          <strong>Metadata:</strong>
                          <pre className="p-2 bg-white rounded mt-1 mb-0 border" style={{ fontSize: "0.75rem" }}>
                            {JSON.stringify(selectedEvent.metadata, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="p-3 rounded-2 bg-light border">
                      <div className="fw-bold mb-2 text-dark">Visitor & Geo Details</div>
                      <div className="small mb-1">
                        <strong>IP Address:</strong> <code>{selectedEvent.visitor?.ip || "Anonymous"}</code>
                      </div>
                      <div className="small mb-1">
                        <strong>Location:</strong> {selectedEvent.visitor?.flag}{" "}
                        {selectedEvent.visitor?.city}, {selectedEvent.visitor?.country} ({selectedEvent.visitor?.countryCode})
                      </div>
                      <div className="small mb-1"><strong>Region:</strong> {selectedEvent.visitor?.region || "N/A"}</div>
                      <div className="small mb-1"><strong>ISP / Network:</strong> {selectedEvent.visitor?.isp || "N/A"}</div>
                      <div className="small mb-1"><strong>Device:</strong> {selectedEvent.visitor?.device}</div>
                      <div className="small mb-1"><strong>OS:</strong> {selectedEvent.visitor?.os}</div>
                      <div className="small mb-1"><strong>Browser:</strong> {selectedEvent.visitor?.browser}</div>
                      <div className="small mb-1"><strong>Screen:</strong> {selectedEvent.visitor?.screen}</div>
                      <div className="small mb-1"><strong>Referrer:</strong> {selectedEvent.visitor?.referrer}</div>
                      <div className="small mb-1 text-truncate">
                        <strong>Visitor ID:</strong> <code>{selectedEvent.visitor?.visitorId}</code>
                      </div>
                      <div className="small text-truncate">
                        <strong>Session ID:</strong> <code>{selectedEvent.visitor?.sessionId}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light py-2">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
