import { useEffect, useState } from "react";
import Image from "next/image";

export default function FollowScrollContainer() {

  const [onPositionBarCount, setOnPositionBarCount] = useState(0);

  useEffect(() => {
    const rectangles = document.querySelectorAll(".rectangle") as NodeListOf<HTMLElement>;
    const sections = document.querySelectorAll(".section") as NodeListOf<HTMLElement>;

    const initialTops = Array.from(rectangles).map(rect => rect.getBoundingClientRect().top + window.scrollY);
    
    const sectionTops = Array.from(sections).map(sec => sec.getBoundingClientRect().top + window.scrollY);

    const handleScroll = () => {
      setOnPositionBarCount(0);

      const scrollPosition = window.scrollY;
      const topOffset = document.getElementById("map").getBoundingClientRect().bottom + window.scrollY

      rectangles.forEach((rect, index) => {
        const rectangleBottom = initialTops[index] + rect.offsetHeight + topOffset;
        const sectionTop = sectionTops[index] + topOffset;

        const paddingCount = rectangles.length - index - 1

        if (scrollPosition >= sectionTop - window.innerHeight + (paddingCount + 1) * rect.offsetHeight) {

          setOnPositionBarCount(prev => prev + 1);

          rect.style.position = "relative";
          rect.style.bottom = "auto";
          rect.style.top = `${sectionTop - topOffset - index * rect.offsetHeight}px`;

        } else if (scrollPosition >= rectangleBottom - window.innerHeight + paddingCount * rect.offsetHeight) {
          
          rect.style.position = "fixed";
          rect.style.bottom = `${paddingCount * rect.offsetHeight}px`;
          rect.style.top = "auto";
          
        } else {
            rect.style.position = "relative";
            rect.style.bottom = "auto";
            rect.style.top = "auto";
        }
    });
  };

    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
}, []);
 
  return (
    <div className="relative">
      <div className="rectangle relative flex justify-center items-center backdrop-blur-sm w-full h-10">
        <div className="relative flex flex-col items-center -translate-x-1/2 left-1/2 w-full h-full">
          <div className="flex justify-center items-center w-24 h-10 bg-white/30 backdrop-blur-md border-2 border-black shadow-lg">
            <span className="text-black text-sm font-bold shadow-md">
              线路总览
            </span>
          </div>
          {onPositionBarCount > 0 &&
            <div id="shadow"
              className="absolute mt-4 w-full h-px bg-[linear-gradient(to_right,_rgba(0,0,0,0)_12.5%,_rgba(0,0,0,1)_40%,_rgba(0,0,0,0)_45%,_rgba(0,0,0,0)_55%,_rgba(0,0,0,1)_60%,_rgba(0,0,0,0)_87.5%)] shadow-[0_-1px_3px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.5)]">
            </div>
          }
        </div>
      </div>
      <div className="rectangle relative flex justify-center items-center backdrop-blur-sm w-full h-10">
        <div className="relative flex flex-col items-center -translate-x-1/2 left-1/2 w-full h-full">
          <div className="flex justify-center items-center w-24 h-10 bg-white/30 backdrop-blur-md border-2 border-black shadow-lg">
            <span className="text-black text-sm font-bold shadow-md">
              书店杂谈
            </span>
          </div>
          {onPositionBarCount > 1 &&
            <div id="shadow"
              className="absolute mt-4 w-full h-px bg-[linear-gradient(to_right,_rgba(0,0,0,0)_12.5%,_rgba(0,0,0,1)_40%,_rgba(0,0,0,0)_45%,_rgba(0,0,0,0)_55%,_rgba(0,0,0,1)_60%,_rgba(0,0,0,0)_87.5%)] shadow-[0_-1px_3px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.5)]">
            </div>
          }
        </div>
      </div>
      <div className="rectangle relative flex justify-center items-center backdrop-blur-sm w-full h-10">
        <div className="relative flex flex-col items-center -translate-x-1/2 left-1/2 w-full h-full">
          <div className="flex justify-center items-center w-24 h-10 bg-white/30 backdrop-blur-md border-2 border-black shadow-lg">
            <span className="text-black text-sm font-bold shadow-md">
              相关链接
            </span>
          </div>
          {onPositionBarCount > 2 &&
            <div id="shadow"
              className="absolute mt-4 w-full h-px bg-[linear-gradient(to_right,_rgba(0,0,0,0)_12.5%,_rgba(0,0,0,1)_40%,_rgba(0,0,0,0)_45%,_rgba(0,0,0,0)_55%,_rgba(0,0,0,1)_60%,_rgba(0,0,0,0)_87.5%)] shadow-[0_-1px_3px_rgba(0,0,0,0.5),0_1px_3px_rgba(0,0,0,0.5)]">
            </div>
          }
        </div>
      </div>
    </div>
  );
};