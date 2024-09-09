'use client'

import dynamic from "next/dynamic";
import FollowScrollContainer from "./ui/follow-scroll-container";
import Image from "next/image";
import OffsetButtons from "./ui/offsetButton";
import SectionSingleDetail from "./ui/sections/singles-detail";

const MainMap = dynamic(async () => (await import('./ui/map/main-map')), {
  ssr: false,
})

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">
      <div id="map"  className="flex justify-center items-center">
        <MainMap />
      </div>
      <div>
        <div className="absolute w-full z-[1000]">
          <FollowScrollContainer />
        </div>
        <section className="section h-screen">
          <div className="relative w-full h-full">
            <Image src="/brick-wall-sp.jpg" fill={true} alt="background picktrue" className="absolute opacity-50 z-[0]"
              style={{ maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 100%)" }}
            />
            <div className="flex w-full h-full pt-12">
              <div className="w-[14%]">
                第一个子元素内容
              </div>
              <div className="flex-1 p-8 pl-12">
                <p>第二个子元素内容</p>
                <p>第二个子元素内容</p>
                <p>第二个子元素内容</p>
              </div>
              <div className="relative w-[32.848%]">
                <Image src="/route1.png" fill={true} alt="background picktrue" className="z-[100] py-8"/>
              </div>
            </div>
          </div>
        </section>
        <section className="section h-screen h-[100]">
          <SectionSingleDetail />
        </section>
        <section className="section pt-8 h-screen bg-gray-300">
          <div className="relative w-full h-full">
            <Image src="/milkyway.jpg" fill={true} alt="background picktrue" className="absolute opacity-75 z-[0]"
              style={{ maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 100%)" }}
            />
            <div className="flex w-full h-full pt-12">
              <div className="w-[14%]">
                第一个子元素内容
              </div>
              <div className="flex-1">
                第二个子元素内容
              </div>
              <div className="w-[32.848%] bg-red-300">
                第三个子元素内容
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
