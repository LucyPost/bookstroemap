import { useEffect, useState } from "react";
import Image from "next/image";

export default function OffsetButtons({buttonList}: {buttonList: JSX.Element[]}) {
 
  return (
    <div className="flex flex-row items-start justify-center w-full h-full">
      {/* 父容器 */}
      <div className="flex flex-col items-center justify-start space-y-24">
        {/* 子元素1 */}
        <div className="text-white w-40 pt-16">
        {buttonList.length > 0 && buttonList[0]}  
        </div>
        <div className="h-2"></div>

        <div className="text-white w-40">
        {buttonList.length > 1 && buttonList[1]}
        </div>
      </div>
      <div className="flex flex-col items-center justify-start space-y-24">
        <div className="h-24"></div>
        {/* 子元素1 */}
        <div className="text-white w-40">
        {buttonList.length > 2 && buttonList[2]}
        </div>
        <div className="h-2"></div>
        {/* 子元素2 */}
        <div className="text-white w-40">
        {buttonList.length > 3 && buttonList[3]}
        </div>
      </div>
    </div>
  );
};