import { useEffect, useState } from "react";
import Image from "next/image";
import OffsetButtons from "../offsetButton";

export default function SectionSingleDetail() {

    const [currentIndex, setCurrentIndex] = useState(0);

    const contents = [
        <div className="text-black">显示的内容 1</div>,
        <div className="text-black">显示的内容 2</div>,
        <div className="text-black">显示的内容 3</div>,
        <div className="text-black">显示的内容 4</div>
    ];

    const images = [
        "/dzfwb.png",
        "/zgsd.png",
        "/lxsd.png",
        "/dzfwb.png"
    ]

    const buttonList: JSX.Element[] = contents.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)} // 点击按钮时切换到对应的内容
          className={`flex items-center space-x-2 py-2 px-4`}
        >
          {/* 按钮内的图标 */}
          <Image src="/dzfwb.png" alt="icon" width={120} height={120} />
        </button>
      ))
 
  return (
    <div className="relative w-full h-full pl-12">
            <div className="absolute w-1/2 h-full left-1/2">
              <Image src="/blue-book-cover.jpg" fill={true} alt="background picktrue" className="opacity-70 z-[0]"
                style={{ maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%)" }}
              />
            </div>
            <div className="absolute w-full h-full">
                <Image src={images[currentIndex]} width={549}  height={330} sizes="100vh" alt="background picktrue" className="h-full w-auto opacity-70 z-[10]"
                style={{ maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 70%)" }}
              />
            </div>
            <div className="flex w-full h-full pt-12">
              <div className="w-[14%]">
                第一个子元素内容
              </div>
              <div className="flex-1">
                {contents[currentIndex]}
              </div>
              <div className="w-[32.848%] bg-transparent z-[100]">
                <OffsetButtons buttonList={buttonList} />
              </div>
            </div>
          </div>
  );
};