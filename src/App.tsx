import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useEffect } from "react";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Team from "./Components/Team/Team";
import Contact from "./Components/Contact/Contact";
import Mockups from "./Components/MockUps/Mockup";
import Workflow from "./Components/Workflow/Workflow";
import Footer from "./Components/Footer/Footer";
import style from "./App.module.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  useEffect(() => {
    // @ts-ignore
    import('./assets/cursor.js').then(() => {});

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper">
      <canvas id="fluid" className={style["bg-cursor"]}></canvas>
      <div className={style["head-pos"]}>
        <Header />
      </div>
      <div id="smooth-content">
        <Home />
        <About />
        <Mockups />
        <Workflow />
        <Team />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
