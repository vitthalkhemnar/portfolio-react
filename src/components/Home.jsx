import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
  const profile = useSelector((state) => state.profile);

  const name = profile.name || "";
  const role = profile.role || "";
  const summary = profile.summary || "";
  const statusText = profile.statusText || "";
  const resumeUrl = profile.resumeUrl || "";
  const githubUrl = profile.githubUrl || "";
  const linkedInUrl = profile.linkedInUrl || "";
  const email = profile.email || "";

  // Smartly clean up any redundant name/role self-introductions in the bio summary
  const getCleanParagraphs = (rawSummary, authorName, authorRole) => {
    if (!rawSummary) return [];

    let paras = rawSummary.split(/\n+/).map((p) => p.trim()).filter(Boolean);

    // If first paragraph is literally just "I'm [Name]" or "[Name]" or "I am [Name]"
    if (paras.length > 0 && authorName) {
      const firstNorm = paras[0].toLowerCase().replace(/['’]/g, "'").trim();
      const nameNorm = authorName.toLowerCase().trim();
      if (
        firstNorm === nameNorm ||
        firstNorm === `i'm ${nameNorm}` ||
        firstNorm === `i am ${nameNorm}` ||
        firstNorm === `my name is ${nameNorm}` ||
        firstNorm.startsWith(`i'm ${nameNorm}.`) ||
        firstNorm.startsWith(`i am ${nameNorm}.`)
      ) {
        paras.shift();
      }
    }

    // In remaining paragraphs, strip leading "I'm [Name], " or "A [Role] specializing in"
    paras = paras
      .map((p) => {
        let cleaned = p;
        if (authorName) {
          const nameRegex = new RegExp(`^I['’]?m\\s+${authorName}[,\\.\\s]+`, "i");
          cleaned = cleaned.replace(nameRegex, "");
          const iAmRegex = new RegExp(`^I\\s+am\\s+${authorName}[,\\.\\s]+`, "i");
          cleaned = cleaned.replace(iAmRegex, "");
        }
        if (authorRole) {
          const roleRegex = new RegExp(
            `^A[n]?\\s+${authorRole}\\s+specializing\\s+in\\s+`,
            "i"
          );
          cleaned = cleaned.replace(roleRegex, "Specializing in ");
          const roleRegex2 = new RegExp(
            `^${authorRole}\\s+specializing\\s+in\\s+`,
            "i"
          );
          cleaned = cleaned.replace(roleRegex2, "Specializing in ");
        }
        cleaned = cleaned.replace(
          /^A[n]?\s+Software\s+Engineer\s+specializing\s+in\s+/i,
          "Specializing in "
        );
        return cleaned.trim();
      })
      .filter(Boolean);

    return paras;
  };

  const paragraphs = getCleanParagraphs(summary, name, role);

  const displaySkills =
    Array.isArray(profile.skills) && profile.skills.length > 0
      ? profile.skills.slice(0, 6)
      : [];

  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container py-4">
        <div className="row align-items-center g-5 py-4">
          {/* Left Column (Content) */}
          <div className="col-12 col-lg-7 text-center text-lg-start">
            {/* Availability Status Pill */}
            {statusText && (
              <div className="d-inline-flex align-items-center gap-2 mb-3 px-3 py-1 rounded-pill hero-status-pill">
                <span className="hero-status-dot"></span>
                <span className="small fw-medium" style={{ color: "#e4e4e7" }}>{statusText}</span>
              </div>
            )}

            {/* Authoritative Name Heading */}
            <h1 className="hero-author-name mb-2">
              {name || "Software Engineer"}
            </h1>

            {/* Professional Role Designation (strictly single occurrence) */}
            {role && (
              <p className="hero-author-role mb-3">
                {role}
              </p>
            )}

            {/* Authentic Human Introduction */}
            {paragraphs.length > 0 && (
              <div className="hero-editorial-bio mb-4">
                {paragraphs.map((para, idx) => (
                  <p key={idx} className="hero-editorial-p">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Action Buttons & Icon Links */}
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-3 mb-4">
              <a href="#project" className="btn-clean-primary">
                Explore Work <i className="bi bi-arrow-down-short"></i>
              </a>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-clean-secondary"
                >
                  <i className="bi bi-file-earmark-pdf"></i> Resume
                </a>
              )}

              {/* Icon Buttons for Social / Contact Links */}
              {(githubUrl || linkedInUrl || email) && (
                <div className="d-flex align-items-center gap-2 ms-lg-2">
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-link"
                      title="GitHub"
                      aria-label="GitHub Profile"
                    >
                      <i className="bi bi-github"></i>
                    </a>
                  )}
                  {linkedInUrl && (
                    <a
                      href={linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-social-link"
                      title="LinkedIn"
                      aria-label="LinkedIn Profile"
                    >
                      <i className="bi bi-linkedin"></i>
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="hero-social-link"
                      title="Email"
                      aria-label="Send Email"
                    >
                      <i className="bi bi-envelope"></i>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Tech Stack Chips */}
            {displaySkills.length > 0 && (
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-2 pt-2">
                <span className="small text-muted fw-semibold me-1">Tech Stack:</span>
                {displaySkills.map((tech) => (
                  <span key={tech} className="clean-chip">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Big Image) */}
          <div className="col-12 col-lg-5 d-flex justify-content-center">
            <div className="hero-photo-wrapper">
              <img
                src={profile.profileImage || "/images/vitthal-image.jpeg"}
                alt={name || "Profile"}
                className="hero-photo-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
