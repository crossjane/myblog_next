"use client";

import db from "@/firebase";
import { getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Editor } from "../Editor";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";
import ReadonlyEditor from "../Editor/ReadonlyEditor";

function EditBoard({
  board,
  detailIsEdit,
  setDetailIsEdit,
  setBoard,
  detailEdit,
  detailEditSave,
  setTempDetailHtml,
  setTempDetailText,
  tempDetailHtml,
  tempDetailText,
  tempTitle,
  changeTitle,
  like,
  bookmark,
}) {
  const router = useRouter();

  const boardId = board.id;

  return (
    <>
      <div className="flex flex-col bg-[#f6f6f6] shadow-xl rounded-2xl p-10 m-25">
        {/* z컨텐츠 */}
        <div>
          {/* 제목  */}

          <div className="flex flex-col pb-3 border-b border-gray-300">
            <div className="flex flex-row ">
              <input
                className="w-full text-left font-bold text-[20px] mb-4 focus:outline-none "
                value={tempTitle}
                onChange={changeTitle}
              ></input>
            </div>

            <div className="flex flex-row items-center">
              <div className="flex flex-1 gap-3 items-center">
                <span className=" text-[14px]"> {board.user?.name}</span>
                <span className="text-[14px]">
                  {board.createdAt?.toLocaleString()}
                </span>
              </div>
              <div className="flex">
                <img
                  src={board.likeId ? "/full_heart.svg" : "/empty_heart.svg"}
                  // onClick={like}
                  className="w-5 cursor-pointer"
                />
                <img
                  src={
                    board.bookmarkId
                      ? "/bookmark_full.svg"
                      : "/bookmark_empty.svg"
                  }
                  // onClick={bookmark}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 내용 */}
          <div className="flex flex-col min-h-80">
            <div className="board-contents min-h-100 py-6 text-[14px] leading-relaxed whitespace-pre-line">
              <Editor
                content={tempDetailHtml}
                onChangeContentWithoutHtml={setTempDetailText}
                onChangeContent={setTempDetailHtml}
                editable={detailIsEdit}
              />
            </div>

            <div className="justify-start text-left py-6 text-[14px] min-h-[300px] leading-relaxed whitespace-pre-line">
              {board.imageUrl && (
                <img src={board.imageUrl} className="w-[100px] h-[100px]"></img>
              )}
            </div>

            <div className="flex justify-end items-center gap-2 mb-2">
              <button
                className="hover:font-medium cursor-pointer"
                onClick={detailEditSave}
              >
                수정완료
              </button>

              <button
                className="text-[15px] cursor-pointer hover:font-medium ml-2"
                onClick={() => router.push("/")}
              >
                목록으로 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditBoard;
