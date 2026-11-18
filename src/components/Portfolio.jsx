import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Experience from "./Experience";
import Project from "./Project";
import Contact from "./Contact";
import Footer from "./Footer";

const Portfolio = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <section id="home" data-aos="fade-up">
          <Home />
        </section>
        <section id="about" data-aos="fade-up">
          <About />
        </section>
        <section id="experience" data-aos="fade-up">
          <Experience />
        </section>
        <section id="project" data-aos="fade-up">
          <Project />
        </section>
        <section id="contact" data-aos="fade-up">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
