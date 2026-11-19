import { useState } from "react";
import { useSelector } from "react-redux";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const profile = useSelector((state) => state.profile);
  const companies = useSelector((state) => state.profile.companies) || [];
  const projects = useSelector((state) => state.profile.projects) || [];

  const role = profile.role || "";
  const name = profile.name || "";
  const experience = profile.experience || "";
  const location = profile.location || "";

  const currentCompany =
    companies.find((c) => c.isCurrent)?.company ||
    (companies[0] ? companies[0].company : "");

  const aboutText = profile.aboutMe || (role ? `I am a ${role}${currentCompany ? ` working at ${currentCompany}` : ""}.` : "");
  const paragraphs = aboutText ? aboutText.split(/\n+/).filter(Boolean) : [];

  // Determine if About content is long enough to warrant a Read More toggle
  const isLongBio = paragraphs.length > 2 || aboutText.length > 320;
  const displayedParagraphs =
    !isExpanded && isLongBio ? paragraphs.slice(0, 1) : paragraphs;

  return (
    <div className="py-5 px-3">
      <div className="container py-3" style={{ maxWidth: "900px" }}>
        {/* Clean Section Header */}
        <div className="text-center mb-5">
          <h2 className="section-heading">About Me</h2>
        </div>

        <div className="row g-4 align-items-center mb-5">
          <div className="col-12 col-md-4 text-center">
            <div
              className="mx-auto overflow-hidden shadow-sm"
              style={{
                width: "200px",
                height: "200px",
                maxWidth: "80vw",
                maxHeight: "80vw",
                borderRadius: "20px",
                border: "1px solid var(--border-subtle)",
                background: "#ffffff"
              }}
            >
              <img
                src={profile.aboutImage || profile.profileImage || "/images/aboutme.jpeg"}
                alt={name || "About"}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
          </div>

          <div className="col-12 col-md-8 text-center text-md-start">
            {displayedParagraphs.length > 0 ? (
              displayedParagraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className={`fs-6 ${pIdx === displayedParagraphs.length - 1 ? "mb-2" : "mb-3"}`}
                  style={{ color: "var(--text-body)", lineHeight: "1.8" }}
                >
                  {para}
                </p>
              ))
            ) : (
              <p className="fs-6 text-muted mb-0" style={{ lineHeight: "1.8" }}>
                Bio details can be configured in the admin dashboard.
              </p>
            )}

            {isLongBio && (
              <button
                type="button"
                className="btn-read-more"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
              >
                {isExpanded ? (
                  <>
                    Show less <i className="bi bi-chevron-up"></i>
                  </>
                ) : (
                  <>
                    Read more <i className="bi bi-chevron-down"></i>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* 3 Dynamic Stat Cards (col-12 col-sm-4 for responsive tablet/desktop grid) */}
        <div className="row g-3 text-center">
          <div className="col-12 col-sm-4">
            <div className="clean-card p-4 h-100">
              <div className="fs-3 fw-bold text-dark mb-1">{experience || "—"}</div>
              <div className="small text-muted">Experience</div>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="clean-card p-4 h-100">
              <div className="fs-3 fw-bold text-dark mb-1">
                {projects.length > 0 ? `${projects.length}+ Projects` : "0 Projects"}
              </div>
              <div className="small text-muted">Built & Showcased</div>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="clean-card p-4 h-100">
              <div className="fs-3 fw-bold text-dark mb-1">
                {location || "—"}
              </div>
              <div className="small text-muted">Primary Location</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
