import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const [animate, setAnimate] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setAnimate(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setHideIntro(true);
      navigate("/signup");
    }, 2000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hideIntro) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center">
      <h1
        className={`text-5xl md:text-[100px] text-red-600 font-extrabold ${
          animate ? "animate-ping" : ""
        } mt-[50px]`}
      >
        MOVIE APP
      </h1>
    </div>
  );
};

export default Intro;
