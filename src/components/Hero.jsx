import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useCallback, useEffect, useRef, useState } from "react";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const debounceTimeoutRef = useRef(null);

  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const miniVdRef = useRef(null);
  const bgVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos) {
      setLoading(false);
    }
  }, [loadedVideos]);

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = useCallback(() => {
    if (hasClicked) return; // Prevent further clicks during animation

    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);

    // Ensure video playback on click
    if (nextVdRef.current) {
      nextVdRef.current.classList.remove("invisible"); // Make next video visible
      nextVdRef.current.play();
    }
    if (miniVdRef.current) {
      miniVdRef.current.classList.add("fade-out"); // Add fade-out class for smooth transition
    }

    // Reset hasClicked after 2 seconds to allow another click
    debounceTimeoutRef.current = setTimeout(() => setHasClicked(false), 1000);
  }, [hasClicked, currentIndex]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (miniVdRef.current) {
      miniVdRef.current.classList.remove("fade-out");
    }
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
          onComplete: () => {
            const newSrc = getVideoSrc(currentIndex);
            const tempVideo = document.createElement("video");
            tempVideo.src = newSrc;
            tempVideo.oncanplaythrough = () => {
              if (bgVdRef.current) {
                requestAnimationFrame(() => {
                  bgVdRef.current.src = newSrc;
                  bgVdRef.current.currentTime = nextVdRef.current.currentTime; // Sync time
                });
              }
            };
          },
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div id="the nexus" className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div>
            <div className="loadingContainer">
              <div className="dot dot-1" />
              <div className="dot dot-2" />
              <div className="dot dot-3" />
            </div>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="goo">
                  <feGaussianBlur
                    result="blur"
                    stdDeviation={10}
                    in="SourceGraphic"
                  />
                  <feColorMatrix
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                    mode="matrix"
                    in="blur"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className={`relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75`}
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={miniVdRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center transition-opacity duration-500 ease-in-out"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center transition-opacity duration-500 ease-in-out"
            onLoadedData={handleVideoLoad}
          />
          <video
            ref={bgVdRef}
            src={getVideoSrc(1)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          C<b>O</b>MB<b>A</b>T
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Ar<b>C</b>ane
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Step into the Shattered Realms <br /> Unleash the Power Within
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        C<b>O</b>MB<b>A</b>T
      </h1>
    </div>
  );
};

export default Hero;
