import analyticsService from "./analyticsService";

describe("analyticsService", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test("logs page visit to local storage fallback", async () => {
    await analyticsService.logVisit();
    const events = await analyticsService.fetchEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe("visit");
    expect(events[0].target).toBe("portfolio_home");
    expect(events[0].visitor).toBeDefined();
    expect(events[0].visitor.visitorId).toBeDefined();
  });

  test("deduplicates page visit within the same browser session", async () => {
    await analyticsService.logVisit();
    await analyticsService.logVisit(); // Second call in same session
    const events = await analyticsService.fetchEvents();
    expect(events.length).toBe(1);
  });

  test("logs resume download event with source", async () => {
    await analyticsService.logResumeDownload("navbar");
    const events = await analyticsService.fetchEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe("resume_download");
    expect(events[0].metadata.source).toBe("navbar");
  });

  test("logs live demo click event with project name", async () => {
    await analyticsService.logDemoClick("FinSight AI", "https://demo.example.com");
    const events = await analyticsService.fetchEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe("demo_click");
    expect(events[0].target).toBe("FinSight AI");
    expect(events[0].metadata.url).toBe("https://demo.example.com");
  });

  test("logs GitHub repo click event with project name", async () => {
    await analyticsService.logRepoClick("Cloud Microservices", "https://github.com/vitthalkhemnar/cloud-microservices");
    const events = await analyticsService.fetchEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe("repo_click");
    expect(events[0].target).toBe("Cloud Microservices");
    expect(events[0].metadata.url).toBe("https://github.com/vitthalkhemnar/cloud-microservices");
  });

  test("can delete an individual event from fallback", async () => {
    await analyticsService.logResumeDownload("hero");
    const events = await analyticsService.fetchEvents();
    expect(events.length).toBe(1);
    const eventId = events[0].id;

    await analyticsService.deleteEvent(eventId);
    const remaining = await analyticsService.fetchEvents();
    expect(remaining.length).toBe(0);
  });
});
