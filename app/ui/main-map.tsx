'use client'

import dynamic from "next/dynamic";
import { useState } from "react";
import HexagonalBar from "./hexagonal-bar";

const CustomMap = dynamic(async () => (await import('./custom-map')), {
    ssr: false,
  })

const OnlineMap = dynamic(async () => (await import('./online-map')), {
    ssr: false,
  })

export default function MainMap() {
    const [selected, setSelected] = useState(0);
    const labels = ['局部地图','高德地图'];

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex justify-start w-5/6 mt-24">
                <HexagonalBar selected={selected} onSelect={setSelected}/>
            </div>
            <div className="w-5/6 flex justify-center items-center aspect-[4/3] mb-8">
                {selected === 0 ? <CustomMap /> : <OnlineMap />}
            </div>
        </div>
    );
}