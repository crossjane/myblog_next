"use client";
import React from "react";
import Header from "./header";
import Image from "next/image";

export default function GetBoards({ getCategories, getBoards }) {
  console.log("카테고리", getCategories);

  return (
    <>
      <div id="root" className="flex flex-col">
        <Header />
        <nav className="flex flex-row items-center mb-6">
          <ul className="flex flex-row items-center gap-4 flex-1">
            {getCategories.map((category) => {
              return (
                <li
                  key={category.id}
                  className="px-4 py-2 rounded cursor-pointer text-green-800 font-semibold text-gray-600 hover:text-green-700 hover:font-semibold"
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
          <div className="flex flex-row items-center gap-2">
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
            <div
              key={board.id}
              className="flex flex-col border-b border-gray-300 py-4"
            >
              <div className="flex mt-3 flex-row items-center mb-4">
                <h2 className="flex mr-3 font-medium text-[22px] text-gray-600 text-left">
                  {board.title}
                </h2>
                <span className="flex text-sm text-gray-500">
                  {board.createdAt
                    ? new Date(board.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>

              <div className="flex flex-row flex-wrap">
                <div className="flex flex-1">
                  <p className="text-gray-700 text-[15px] line-clamp-3 leading-5 w-[95%] text-left">
                    {board.withoutHtml} <br />
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="mr-[3px]">{board.likeCount}</div>
                  <Image
                    width={20}
                    height={10}
                    src="/full_heart.svg"
                    alt="빈하트"
                    className="w-5"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
