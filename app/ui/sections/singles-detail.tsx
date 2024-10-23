import { useEffect, useState } from "react";
import Image from "next/image";
import OffsetButtons from "../offsetButton";

export default function SectionSingleDetail() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const contents = [
    <div key={0}>
      <div className="pt-12 pr-20 text-2xl">鲁迅书店</div>
      <div className="pt-12 pr-20 text-xl indent-8">
        一直以来，鲁迅博物馆和其他文博单位一样，承担了文化宣传、社会教育等职能，前来参观的观众在浏览鲁迅博物馆内展陈的同时，更有深入了解鲁迅其人、其文的需求。鲁迅书店应运而生，旨在为市民和游客提供一个学习阅读鲁迅文论的场所。
        书店靠墙一侧的橱窗内置有51册泛黄的鲁迅博物馆内藏书。其中既有为书迷所熟知的《呐喊》《彷徨》等鲁迅小说作品，也有其杂文集《野草》《坟》《且介亭杂文》等，还有出版于20世纪20年代的鲁迅学术著述的代表作《中国小说史略》，多册藏书已有百年历史。
      </div>
    </div>,
    <div key={1}>
      <div className="pt-12 pr-20 text-2xl">中国书店读者服务部</div>
      <div className="pt-12 pr-20 text-xl indent-8">
        “‘为读者找书，为书找读者’是中国书店一直传承和秉持的服务理念。70多年来，中国书店不仅是把书卖出去，还竭尽所能去满足读者所需。”
        青砖黛瓦、雕梁画栋，地处琉璃厂古文化街的店面是中国书店的旗舰店，古香古色的风韵和其古旧书的定位完美匹配，郭沫若题写的“中国书店”四个大字在阳光下闪烁着金色的光芒。
        提到琉璃厂，就不得不说到其来源。琉璃厂大街是北京一条著名的文化街，起源于清代，当时各地来京参加科举考试的举人大多集中住在这一带，因此，在这里出售书籍和笔墨纸砚的店铺较多，形成了较为浓厚的文化氛围。后来又因开设官窑得名“琉璃厂”。中国书店植根于此，足见其历史底蕴之深厚。
      </div>
    </div>,
    <div key={2}>
    <div className="pt-12 pr-20 text-2xl">纪府书房</div>
      <div className="pt-12 pr-20 text-xl indent-8">
        在众多书店中，中国书店因收购、经营古旧书而独树一帜。成立70多年来，这家由100多家旧书摊、书店合并而成的书店，搜寻过淹没在废纸里的文献，办过临时搭建几排棚子的古籍书市，还把拍卖引入古旧书业。如今，中国书店更是通过重印、再版等形式令绝版古旧书延续生命，并将古籍零页装裱成“片羽存真”文创产品，让古旧书与读者、藏家实现了美丽邂逅。
        2015年，位于地安门十字路口路南的雁翅楼挂上了“中国书店”的牌匾，这是中国书店旗下首家“不打烊”书店，也是北京市属第一家国有24小时书店。
      </div>
    </div>,
    <div key={3}>
      <div className="pt-12 pr-20 text-2xl">中国书店雁翅楼店</div>
      <div className="pt-12 pr-20 text-xl indent-8">
        在众多书店中，中国书店因收购、经营古旧书而独树一帜。成立70多年来，这家由100多家旧书摊、书店合并而成的书店，搜寻过淹没在废纸里的文献，办过临时搭建几排棚子的古籍书市，还把拍卖引入古旧书业。如今，中国书店更是通过重印、再版等形式令绝版古旧书延续生命，并将古籍零页装裱成“片羽存真”文创产品，让古旧书与读者、藏家实现了美丽邂逅。
        2015年，位于地安门十字路口路南的雁翅楼挂上了“中国书店”的牌匾，这是中国书店旗下首家“不打烊”书店，也是北京市属第一家国有24小时书店。
      </div>
    </div>
  ];
  

  const icons = [
    "/lxsd-icon.png",
    "/dzfwb-icon.png",
    "/jfsf-icon.png",
    "/zgsd-icon.png"
  ]

    const images = [
        "/lxsd.jpg",
        "/dzfwb.webp",
        "/jfsf.webp",
        "/zgsd.webp"
    ]

    const buttonList: JSX.Element[] = contents.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)} // 点击按钮时切换到对应的内容
          className={`flex items-center space-x-2 py-2 px-4`}
        >
          {/* 按钮内的图标 */}
          <Image key={index} src={icons[index]} alt="icon" width={120} height={120} />
        </button>
      ))
 
  return (
    <div className="relative w-full h-full pl-12">
      <div className="absolute w-1/2 h-full left-1/2">
        <Image src={images[currentIndex]} fill={true} alt="background picktrue" className="opacity-70 z-[0]"
          style={{ maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 1) 100%)" }}
        />
      </div>
      <div className="absolute w-11/12 h-full">
          <Image src="/plufow-le-studio-yQAs-jLjwUg-unsplash.jpg" width={549}  height={330} sizes="100vh" alt="background picktrue" className="h-full w-full opacity-70 z-[10]"
          style={{ maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 90%)" }}
        />
      </div>
      <div className="flex w-full h-full pt-12">
        <div className="w-[14%]">
          
        </div>
        <div className="flex-1 z-[100]">
          {contents[currentIndex]}
        </div>
        <div className="w-[32.848%] bg-transparent z-[100]">
          <OffsetButtons buttonList={buttonList} />
        </div>
      </div>
    </div>
  );
};