"use client";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <>
      <div className="w-full flex justify-end px-6 py-2">
        <p className="mr-8 leading-relaxed text-[15px]">손님님 환영합니다.</p>

        <button
          className="text-[#5F7D7D] font-semibold text-[16px] rounded-md border-2 px-4 pb-1 mr-4 cursor-pointer hover:bg-[#e6ecec]"
          style={{ fontFamily: '"Josefin Slab"' }}
        >
          my page
        </button>

        <button
          className="text-[#5F7D7D] font-semibold text-[16px] rounded-md border-2 px-4 cursor-pointer hover:bg-[#e6ecec]"
          style={{ fontFamily: '"Josefin Slab"' }}
        >
          logout
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mb-6">
        <b
          className="font-medium font-josefin tracking-wide text-[50px] mb-7 text-[#5F7D7D] cursor-pointer mt-20"
          style={{ fontFamily: '"Josefin Slab", serif' }}
        >
          Jane's Blog
        </b>
        Jane의 front-end 기술 블로그 입니다.
        <Image
          src="/line_keyboard.png"
          alt="메인 헤더 키보드 이미지"
          width={320}
          height={100}
          className="cursor-pointer"
        />
      </div>
    </>
  );
}
export default Header;
