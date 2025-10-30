import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,   // animation duration (ms)
      once: true,      // animate only once per section
      offset: 100,     // how early animation starts
    });
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
}

export default App;
