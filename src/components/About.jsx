import { useState } from "react";
import { useSelector } from "react-redux";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const profile = useSelector((state) => state.profile);
  const companies = useSelector((state) => state.profile.companies) || [];

  const role = profile.role || "";
  const name = profile.name || "";

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
      <div className="container py-3" style={{ maxWidth: "960px" }}>
        {/* Unified Section Header */}
        <div className="text-center mb-5">
          <span className="section-eyebrow">{"// 01. ABOUT"}</span>
          <h2 className="section-heading">About Me</h2>
          <p className="section-desc">
            Background, technical focus, and engineering philosophy.
          </p>
        </div>

        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-4 text-center">
            <div
              className="mx-auto overflow-hidden shadow-sm"
              style={{
                width: "210px",
                height: "210px",
                maxWidth: "80vw",
                maxHeight: "80vw",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: "var(--bg-card)",
                padding: "6px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)"
              }}
            >
              <img
                src={profile.aboutImage || profile.profileImage || "/images/aboutme.jpeg"}
                alt={name || "About"}
                className="w-100 h-100 object-fit-cover rounded-4"
              />
            </div>
          </div>

          <div className="col-12 col-md-8 text-center text-md-start">
            {displayedParagraphs.map((para, pIdx) => (
              <p
                key={pIdx}
                className={`fs-6 ${pIdx === displayedParagraphs.length - 1 ? "mb-2" : "mb-3"}`}
                style={{ color: "var(--text-body)", lineHeight: "1.8", fontSize: "1.02rem" }}
              >
                {para}
              </p>
            ))}

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

            <div className="mt-4 pt-1 d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-3">
              <a
                href={profile.resumeUrl || "/Vitthal Khemnar - Resume.pdf"}
                download="Vitthal_Khemnar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clean-secondary rounded-pill d-inline-flex align-items-center gap-2"
                title="Download Resume PDF"
              >
                <i className="bi bi-download" style={{ color: "var(--primary)" }}></i>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
