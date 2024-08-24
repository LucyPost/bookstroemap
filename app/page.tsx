'use client'
import MainMap from "./ui/map/main-map";
import FollowScrollContainer from "./ui/follow-scroll-container";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex justify-center items-center">
        <MainMap />
      </div>
      <div>
        <div className="absolute w-full">
          <FollowScrollContainer />
        </div>
        <section className="section py-12 h-screen">
          <div className="flex w-full h-full">
            <div className="w-[14%]">
              第一个子元素内容
            </div>
            <div className="flex-1 bg-green-300">
              第二个子元素内容
            </div>
            <div className="w-[32.848%] bg-red-300">
              第三个子元素内容
            </div>
          </div>
        </section>
        <section className="section py-12 h-screen bg-gray-200">
          <p>段落 2 的内容...</p>
          <p>段落 2 的内容...</p>
          <p>段落 2 的内容...</p>
          <p>段落 2 的内容...</p>
        </section>
        <section className="section py-12 h-screen bg-gray-300">
          <p>段落 3 的内容...</p>
          <p>段落 3 的内容...</p>
          <p>段落 3 的内容...</p>
          <p>段落 3 的内容...</p>
        </section>
      </div>
    </main>
  );
}
