import DeleteBtn from "@/app/components/DeleteBtn";
import EditBtn from "@/app/components/EditBtn";
import ReadonlyEditor from "@/app/components/Editor/ReadonlyEditor";
import db from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

export default async function BoardDetail({ params }) {
  const { boardId, categoryId } = await params;

  console.log("boardId", boardId, "categoryId", categoryId);
  const docRef = doc(db, "category", categoryId, "board", boardId);
  const docSnap = await getDoc(docRef);

  let board = null;

  if (docSnap.exists()) {
    const id = docSnap.id;
    const data = docSnap.data();
    const formatBoard = { id, ...data };
    board = formatBoard;
  }
  return board ? (
    <>
      <div className="flex flex-col bg-[#f6f6f6] shadow-xl rounded-2xl p-10 m-25">
        {/* z컨텐츠 */}
        <div>
          {/* 제목  */}

          <div className="flex flex-col pb-3 border-b border-gray-300">
            <div>
              <p className="text-left font-bold text-[20px] mb-4">
                {board.title}
              </p>
            </div>

            <div className="flex flex-row items-center">
              <div className="flex flex-1 gap-3 items-center">
                <span className=" text-[14px]"> {board.user?.name}</span>
                <span className="text-[14px]">
                  {board.createdAt?.toDate().toLocaleString()}
                </span>
              </div>
              <div className="flex">
                <img
                  src={board.likeId ? "/full_heart.svg" : "/empty_heart.svg"}
                  className="w-5 cursor-pointer"
                />
                <img
                  src={
                    board.bookmarkId
                      ? "/bookmark_full.svg"
                      : "/bookmark_empty.svg"
                  }
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 내용 */}
          <div className="flex flex-col min-h-80">
            <div className="justify-start text-left py-6 text-[14px] min-h-[300px] leading-relaxed whitespace-pre-line">
              {board.contents && <ReadonlyEditor content={board.contents} />}
              {board.imageUrl && (
                <Image
                  src={board.imageUrl}
                  width={100}
                  height={50}
                  alt="Board"
                  className="w-[100px] h-[100px]"
                />
              )}
            </div>

            <div className="flex justify-end items-center gap-2 mb-2">
              <>
                <EditBtn />
                <DeleteBtn />
              </>

              <button className="text-[15px] cursor-pointer hover:font-medium ml-2">
                목록으로 가기
              </button>
            </div>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div>
          <p className="font-medium text-left text-gray-600 mb-3 ml-1">댓글</p>
          <div className="bg-white border rounded border-gray-300 min-h-30 "></div>

          <div className="mt-2">
            <strong className="text-gray-600 text-[13px]">{"이름"}님</strong>
            <span className="ml-2 text-[12px] text-gray-500">
              2025-04-30 18:00
            </span>
          </div>
          <div className="flex flex-row items-center">
            <div className="flex flex-1">
              <p className="text-[13px] pt-3 break-all">코멘트</p>
            </div>
            <div className="flex justify-end gap-2 cursor-pointer">
              {/* user는 객체.  */}

              <img src="/edit.svg" className="w-5"></img>
              <img src="/delete.svg" className="w-3.5"></img>

              <img src={"/full_heart.svg"} className="w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row itmes-center w-full mt-5">
        {/* {user && <span>{user.name}</span>} */}

        <input
          className="flex-1 bg-white border-gray-300 border-1 focus:px-2 rounded-md h-8 mr-3 focus:outline-none"
          type="text"
        />
        <button className="h-8 w-25 text-[14px] rounded-md bg-[#5F7D7D] hover:bg-[#435b5b] cursor-pointer text-white">
          댓글 등록
        </button>
      </div>
    </>
  ) : (
    <div>존재하지않는 게시글입니다.</div>
  );
}
