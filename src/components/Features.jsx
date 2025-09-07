import { TiLocationArrow } from "react-icons/ti";
import BentoCard from "./BentoCard";
import { useRef, useState } from "react";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52 z-0" id="the forge">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50 ">
          Journey Beyond the Veil
        </p>
        <p
          className="max-w-md font-circular-web text-lg text-blue-50
        opacity-50"
        >
          Journey into a world alive with energy, where dazzling innovations and
          creations harmonize into a seamless, immersive adventure.
        </p>
      </div>
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-3.mp4"
          title={
            <>
              Vi<b>o</b>let
            </>
          }
          description="A steadfast protector, Vi brings strength and resolve, fighting to uphold justice with her iron will and gauntlets."
          isComingSoon
        />
      </BentoTilt>
      <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                enfo<b>n</b>cers
              </>
            }
            description="A symbol of order, the Enforcers unite Piltover and Zaun, forging a path through chaos into a mission driven by justice and resolve."
            isComingSoon
          />
        </BentoTilt>
        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                Jin<b>x</b>
              </>
            }
            description="A chaotic force of nature, Jinx revels in mayhem, turning every moment into an explosive spectacle of anarchy."
            isComingSoon
          />
        </BentoTilt>
        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0 ">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                r<b>U</b>nes<b>t</b>one
              </>
            }
            description="Ancient artifacts infused with untamed power, hold the secrets of magic and innovation, bridging the worlds of science and sorcery in Arcane."
            containerClass="transform scaleX[-1]"
            isComingSoon
          />
        </BentoTilt>
        <div className="bento-tilt_2">
          <BentoTilt className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              <b>m</b>ore comi<b>n</b>g so<b>o</b>n
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </BentoTilt>
        </div>
        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            autoPlay
            muted
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);
export default Features;
