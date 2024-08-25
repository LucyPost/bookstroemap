import { useEffect } from "react";

export default function FollowScrollContainer() {
  useEffect(() => {
    const rectangles = document.querySelectorAll(".rectangle") as NodeListOf<HTMLElement>;
    const sections = document.querySelectorAll(".section") as NodeListOf<HTMLElement>;

    const initialTops = Array.from(rectangles).map(rect => rect.getBoundingClientRect().top + window.scrollY);
    
    const sectionTops = Array.from(sections).map(sec => sec.getBoundingClientRect().top + window.scrollY);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const topOffset = document.getElementById("map").getBoundingClientRect().bottom + window.scrollY

      rectangles.forEach((rect, index) => {
        const rectangleBottom = initialTops[index] + rect.offsetHeight + topOffset;
        const sectionTop = sectionTops[index] + topOffset;

        const paddingCount = rectangles.length - index - 1

        if (scrollPosition >= sectionTop - window.innerHeight + (paddingCount + 1) * rect.offsetHeight) {

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
      <div className="rectangle relative h-8 w-full">
        <div className="relative h-8 bg-blue-500 -translate-x-1/2 left-1/2 w-1/4">
          title 1
        </div>
      </div>
      <div className="rectangle relative h-8 bg-blue-500 -translate-x-1/2 left-1/2 w-1/4">
        title 2
      </div>
      <div className="rectangle relative h-8 bg-green-500 -translate-x-1/2 left-1/2 w-1/4">
        title 3
      </div>
    </div>
  );
};