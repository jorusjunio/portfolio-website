import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import IntroAnimation from "./components/IntroAnimation";
import Hero from "./components/Hero";
import About from "./components/About";
import ToolStack from "./components/ToolStack";
import Services from "./components/Services";
import Projects from "./components/Projects";
import CreativeWork from "./components/CreativeWork";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#03060b]">
      <SmoothScroll />
      <IntroAnimation />
      <Navbar />
      <Hero />
      <About />
      <ToolStack />
      <Services />
      <Projects />
      <CreativeWork />
      <Contact />
      <Footer />
    </main>
  );
}
