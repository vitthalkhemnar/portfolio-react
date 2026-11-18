/**
 * Calculates total professional experience from an array of company experiences.
 * Supports structured startDate/endDate or parses duration strings.
 */
export const calculateTotalExperience = (companies = []) => {
  if (!companies || companies.length === 0) {
    return "0 Years";
  }

  let totalMonths = 0;
  const now = new Date();

  companies.forEach((comp) => {
    let start = null;
    let end = now;

    if (comp.startDate) {
      start = new Date(comp.startDate);
    }

    if (comp.isCurrent || comp.endDate === "Present" || !comp.endDate) {
      end = now;
    } else if (comp.endDate) {
      end = new Date(comp.endDate);
    }

    // If structured dates were provided and valid
    if (start && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      if (months > 0) {
        totalMonths += months;
        return;
      }
    }

    // Fallback: parse duration string e.g. "2023 - Present" or "Jan 2023 - Present"
    if (comp.duration) {
      const parts = comp.duration.split("-").map((p) => p.trim());
      if (parts.length === 2) {
        const startYearMatch = parts[0].match(/\b(20\d\d|19\d\d)\b/);
        const endPart = parts[1];

        if (startYearMatch) {
          const startYear = parseInt(startYearMatch[1], 10);
          let endYear = now.getFullYear();

          if (!endPart.toLowerCase().includes("present")) {
            const endYearMatch = endPart.match(/\b(20\d\d|19\d\d)\b/);
            if (endYearMatch) {
              endYear = parseInt(endYearMatch[1], 10);
            }
          }

          const diffYears = endYear - startYear;
          totalMonths += Math.max(12, diffYears * 12);
          return;
        }
      }
    }

    // Default to at least 12 months for an active position if cannot parse
    totalMonths += 12;
  });

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? "Month" : "Months"}`;
  }

  if (remainingMonths === 0) {
    return `${years}+ ${years === 1 ? "Year" : "Years"}`;
  }

  if (remainingMonths >= 6) {
    return `${years}.5+ Years`;
  }

  return `${years}+ ${years === 1 ? "Year" : "Years"}`;
};
