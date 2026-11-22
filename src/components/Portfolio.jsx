import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Project from "./Project";
import Contact from "./Contact";
import Footer from "./Footer";
import analyticsService from "../services/analyticsService";

const Portfolio = () => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 80 });
    analyticsService.logVisit();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: "var(--bg-page)" }}>
      <Navbar />
      <main className="flex-grow-1">
        <section id="home">
          <Home />
        </section>
        <div className="section-divider"></div>
        <section id="about" data-aos="fade-up">
          <About />
        </section>
        <div className="section-divider"></div>
        <section id="skills" data-aos="fade-up">
          <Skills />
        </section>
        <div className="section-divider"></div>
        <section id="experience" data-aos="fade-up">
          <Experience />
        </section>
        <div className="section-divider"></div>
        <section id="project" data-aos="fade-up">
          <Project />
        </section>
        <div className="section-divider"></div>
        <section id="contact" data-aos="fade-up">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
