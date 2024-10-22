'use client'

import dynamic from "next/dynamic";
import FollowScrollContainer from "./ui/follow-scroll-container";
import Image from "next/image";
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
                
              </div>
              <div className="flex-1 p-12 pl-12 text-xl indent-8 shadow-md z-[100]">
                <p>从鲁迅书店到纪府书房，可以途径辟才胡同、灵境胡同，路途不长不短，若想多体验身处不同空间的感觉，又不愿跻身于城市繁忙的大交通，骑行或是步行游览，乃是极佳</p>
                <br></br>
                <p>若是已经看腻了北京那大大小小的胡同，或是不打算将推荐线路里的地方挨个走遍，出了鲁迅书房，不如先不急着往南，再往东走走，先是途径中国地址博物馆，拐个弯，又能顺带再看看红楼藏书阁，岂不美哉</p>
                <br></br>
                <p>当然，也没有必要完全按着路线来走，像不熟识北京的游客，刚逛完天安门广场，从南侧离开，右转到老舍茶馆且歇歇脚.别想着初来乍到就想着品尝豆汁，别说外地人，不少本地人都不喜欢喝，酒好喝吗？烟好抽吗？一个道理。话说回来，品几口茶，冬夏咸宜，又该上路，直走左拐，便能到纪府书房</p>
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
                
              </div>
              <div className="flex-1">
                <div className="flex space-x-8">
                  <div className="flex flex-col items-center">
                    <div className="bg-transparent h-36"></div>
                    <a href="https://baijiahao.baidu.com/s?id=1796090898604128867" className="bg-white font-bold text-xs bg-opacity-20 rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-2xl h-60 w-14">
                      中国书店：承古萌新 赓续文脉
                    </a>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-transparent h-52"></div>
                    <a href="https://new.qq.com/rain/a/20240530A00ONO00" className="bg-white font-bold text-xs text-center break-words bg-opacity-20 rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-2xl h-86 w-14">
                      来京城70余岁中国书店，邂逅古旧书之美
                    </a>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-transparent h-44"></div>
                    <a href="https://new.qq.com/rain/a/20220326A04ABC00" className="bg-white font-bold text-xs bg-opacity-20 rounded-lg shadow-lg p-6 transition transform hover:scale-105 hover:shadow-2xl h-50 w-14">
                      春来北京纪晓岚故居
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-[32.848%]">
                
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
