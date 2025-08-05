"use client";
import React from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import BoardItem from "./BoardItem";

export default function HomeWrapper({ getCategories, getBoards }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <>
      <div id="root" className="flex flex-col">
        <nav className="flex flex-row items-center mb-6">
          <ul className="flex flex-row items-center gap-4 flex-1">
            {getCategories.map((category) => {
              return (
                <li
                  key={category.id}
                  className="px-4 py-2 rounded cursor-pointer font-semibold text-[#859f9f] hover:text-[#5F7D7D] hover:font-semibold"
                  onClick={() => router.push(`?categoryId=${category.id}`)}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
          <div className="flex flex-row items-center gap-2">
            <>
              <div className="relative group">
                <button className="w-7 h-auto cursor-pointer">
                  <Image
                    src="/board_wirte.svg"
                    width={100}
                    height={20}
                    alt="글쓰기"
                  />
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-500 text-white text-xs w-13 rounded py-1 px-2">
                  글쓰기
                </div>
              </div>
            </>

            <>
              <div className="relative group">
                <button
                  className="w-7 h-auto cursor-pointer"
                  onClick={() => {
                    if (user) {
                      gotoWrite();
                    } else {
                      alert("로그인 후 글쓰기가 가능합니다.");
                    }
                  }}
                >
                  {/* <img src="/board_wirte.svg" alt="글쓰기기"></img> */}
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-500 text-white text-xs w-13 rounded py-1 px-2">
                  글쓰기
                </div>
              </div>
            </>
          </div>
        </nav>

        <div className="flex flex-col cursor-pointer">
          {getBoards.map((board) => (
            <BoardItem
              key={board.id}
              title={board.title}
              id={board.id}
              createdAt={board.createdAt}
              withoutHtml={board.withoutHtml}
              likeCount={board.likeCount}
              categoryId={
                searchParams.get("categoryId")
                  ? searchParams.get("categoryId")
                  : "OfLdJf7dkBswF0756yBw"
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
