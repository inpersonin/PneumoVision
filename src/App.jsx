import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Detector from "./components/sections/Detector";
import ModelInfo from "./components/sections/ModelInfo";
import Architecture from "./components/sections/Architecture";
import Performance from "./components/sections/Performance";
import Charts from "./components/sections/Charts";
import Dataset from "./components/sections/Dataset";
import TechStack from "./components/sections/TechStack";
import About from "./components/sections/About";

export default function App() {
  return (
    <div className="min-h-screen bg-transparent text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Detector />
        <ModelInfo />
        <Architecture />
        <Performance />
        <Charts />
        <Dataset />
        <TechStack />
        <About />
      </main>
      <Footer />
    </div>
  );
}
