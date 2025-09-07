import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: "0",
    });
  });

  return (
    <div className="min-h-screen w-screen" id="chronicles">
      <div className="relative mb-8 mt-36 flex flex-col  items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome To Michael's Arcane
        </h2>
        <AnimatedTitle
          title="Expl<b>O</b>re the Boundaries <br /> of M<b>A</b>gic and Con<b>F</b>lict"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Battle for Power Begins – Your Fate, Now a War of Wills</p>
          <p>Arcane Unites the Shattered Factions Across All Realms</p>
        </div>
      </div>
      <div className="h-dvh w-screen " id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
