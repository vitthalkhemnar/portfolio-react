import { useSelector } from "react-redux";

const Footer = () => {
  const profile = useSelector((state) => state.profile);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 border-top bg-white">
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center text-secondary small px-3 px-md-4">
        <div>
          &copy; {currentYear} <strong className="text-dark">{profile.name || "Vitthal Khemnar"}</strong>. Built with React.
        </div>
        <div className="mt-2 mt-sm-0">
          <span>{profile.role || "Java Backend Developer"} &bull; {profile.location || "Pune, India"}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
