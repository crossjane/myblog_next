"use client";

import React, { useState } from "react";
import ReadonlyEditor from "../Editor/ReadonlyEditor";
import { useRouter } from "next/navigation";
import { Editor } from "../Editor";
import Image from "next/image";
import { useSelector } from "react-redux";
import { authSelector } from "@/features/auth/slice";

function Readonly({
  board,
  detailIsEdit,
  tempTitle,
  changeTitle,
  user,
  detailEditSave,
  detailDelete,
  like,
  detailEdit,
  bookmark,
  tempDetailHtml,
  setTempDetailText,
  setTempDetailHtml,
  commentData,
  boardId,
  categoryId,
}) {
  const router = useRouter();

  const [comments, setComments] = useState(commentData);

  const [tempComment, setTempComment] = useState("");
  const { me } = useSelector(authSelector.getMe);
  // 댓글 관리

  async function saveComment() {
    try {
      const commentRef = collection(
        db,
        "category",
        categoryId,
        "board",
        boardId,
        "comment"
      );

      if (tempComment.trim().length === 0) {
        alert("내용을 입력해주세요.");
        return;
      }

      const newComment = {
        content: tempComment,
        createdAt: new Date(),
        uid: user.uid,
      };

      const docRef = await addDoc(commentRef, newComment);

      const commentWithId = {
        id: docRef.id,
        ...newComment,
        isEdit: false,
        tempComment: "",
        uid: me.uid,
        user: user,
      };

      setTempComment("");
      setComments((prev) => [...prev, commentWithId]);
    } catch (error) {
      console.log("error", error);
      alert("로그인 후 이용해주세요.");
    }
  }

  function changeComment(e) {
    setTempComment(e.target.value);
  }

  async function deleteComment(commentId) {
    try {
      await deleteDoc(
        doc(db, "category", categoryId, "board", boardId, "comment", commentId)
      );
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.log("error", error);
      alert("댓글을 삭제 할 수 없습니다.");
    }
  }

  function changeEditComment(e, index) {
    const copyComments = [...comments];
    copyComments[index].tempComment = e.target.value;
    setComments(copyComments);
  }

  function editComment(commentId) {
    const editedComment = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, isEdit: true, tempComment: comment.content }
        : comment
    );

    setComments(editedComment);
  }

  async function editSaveComment(commentId) {
    try {
      const comment = comments.find((comment) => comment.id === commentId);

      if (comment.tempComment.trim().length === 0) {
        alert("댓글 내용을 작성해주세요.");
        return;
      }

      const docRef = doc(
        db,
        "category",
        categoryId,
        "board",
        boardId,
        "comment",
        commentId
      );
      await updateDoc(docRef, {
        content: comment.tempComment,
      });
    } catch (error) {
      console.log("error", error);
      alert("댓글을 수정할 수 없습니다.");
    }

    loadComment();
    setTempComment("");
  }

  // 댓글좋아요

  async function commentLike(commentId) {
    try {
      const commentIndex = comments.findIndex(
        (comment) => commentId === comment.id
      );

      const likeComment = comments[commentIndex];
      const copyComments = [...comments];

      if (!likeComment.likeId) {
        const likeRef = collection(
          db,
          "category",
          categoryId,
          "board",
          boardId,
          "comment",
          commentId,
          "like"
        );

        const newLike = {
          uid: user.uid,
        };

        const docRef = await addDoc(likeRef, newLike);

        copyComments[commentIndex].likeId = docRef.id;
      } else {
        await deleteDoc(
          doc(
            db,
            "category",
            categoryId,
            "board",
            boardId,
            "comment",
            commentId,
            "like",
            likeComment.likeId
          )
        );

        copyComments[commentIndex].likeId = "";
      }

      setComments(copyComments);
    } catch (error) {
      console.log("error", error);
      alert("좋아요를 누를 수 없습니다.");
    }
  }

  console.log("댓글정보!!", comments);
  return (
    <>
      <div className="flex flex-col bg-[#f6f6f6] shadow-xl rounded-2xl p-10 m-25">
        {/* z컨텐츠 */}
        <div>
          {/* 제목  */}

          <div className="flex flex-col pb-3 border-b border-gray-300">
            {detailIsEdit ? (
              <div className="flex flex-row ">
                <input
                  className="w-full text-left font-bold text-[20px] mb-4 focus:outline-none "
                  value={tempTitle}
                  onChange={changeTitle}
                ></input>
              </div>
            ) : (
              <div>
                <p className="text-left font-bold text-[20px] mb-4">
                  {board.title}
                </p>
              </div>
            )}
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
                  onClick={like}
                  className="w-5 cursor-pointer"
                />
                <img
                  src={
                    board.bookmarkId
                      ? "/bookmark_full.svg"
                      : "/bookmark_empty.svg"
                  }
                  onClick={bookmark}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 내용 */}
          <div className="flex flex-col min-h-80">
            {detailIsEdit ? (
              <div className="board-contents min-h-100 py-6 text-[14px] leading-relaxed whitespace-pre-line">
                <Editor
                  content={tempDetailHtml}
                  onChangeContentWithoutHtml={setTempDetailText}
                  onChangeContent={setTempDetailHtml}
                />
              </div>
            ) : (
              <div className="justify-start text-left py-6 text-[14px] min-h-[300px] leading-relaxed whitespace-pre-line">
                {board.contents && <ReadonlyEditor content={board.contents} />}

                {board.imageUrl && (
                  <img
                    src={board.imageUrl}
                    className="w-[100px] h-[100px]"
                  ></img>
                )}
              </div>
            )}

            <div className="flex justify-end items-center gap-2 mb-2">
              {detailIsEdit ? (
                <button
                  className="hover:font-medium cursor-pointer"
                  onClick={detailEditSave}
                >
                  수정완료
                </button>
              ) : board.uid ? (
                <>
                  <button
                    className="hover:font-medium cursor-pointer"
                    onClick={detailEdit}
                  >
                    <img src="/edit.svg" className="h-6" />
                  </button>
                  <button
                    className="hover:font-medium cursor-pointer"
                    onClick={detailDelete}
                  >
                    <img src="/delete.svg" className="h-5" />
                  </button>
                </>
              ) : null}
              <button
                className="text-[15px] cursor-pointer hover:font-medium ml-2"
                onClick={() => router.push(`/`)}
              >
                목록으로 가기
              </button>
            </div>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div>
          <p className="font-medium text-left text-gray-600 mb-3 ml-1">댓글</p>
          <div className="bg-white border rounded border-gray-300 min-h-30 ">
            {comments &&
              comments.map((comment, index) =>
                comment.isEdit ? (
                  <div key={comment.id}>
                    <input
                      type="text"
                      value={comment.tempComment}
                      onChange={(e) => changeEditComment(e, index)}
                    />
                    <button onClick={() => editSaveComment(comment.id)}>
                      저장
                    </button>
                  </div>
                ) : (
                  <div key={comment.id}>
                    <div className="px-4 py-2 flex flex-col min-h-8 rounded-md ">
                      <div
                        className={`text-left text-[15px] mr-2 pb-2  ${
                          comments.length - 1 === index
                            ? ""
                            : "border-b border-gray-300"
                        }`}
                      >
                        <div className="mt-2">
                          <strong className="text-gray-600 text-[13px]">
                            {comment.user?.name}님
                          </strong>
                          <span className="ml-2 text-[12px] text-gray-500">
                            2025-04-30 18:00
                          </span>
                        </div>
                        <div className="flex flex-row items-center">
                          <div className="flex flex-1">
                            <p className="text-[13px] pt-3 break-all">
                              {comment.content}
                            </p>
                          </div>
                          <div className="flex justify-end gap-2 cursor-pointer">
                            {/* user는 객체.  */}
                            {comment.user && me?.uid === comment.user.uid ? (
                              <>
                                <Image
                                  src="/edit.svg"
                                  className="w-5"
                                  width={50}
                                  height={50}
                                  alt={"댓글수정"}
                                  onClick={() => editComment(comment.id)}
                                />
                                <Image
                                  src="/delete.svg"
                                  className="w-3.5"
                                  width={100}
                                  height={100}
                                  alt={"댓글삭제"}
                                  onClick={() => deleteComment(comment.id)}
                                />
                              </>
                            ) : null}
                            <Image
                              src={
                                comment.likeId
                                  ? "/full_heart.svg"
                                  : "/empty_heart.svg"
                              }
                              width={100}
                              height={100}
                              alt={"하트"}
                              onClick={() => commentLike(comment.id)}
                              className="w-5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>

        {/* 댓글 입력 */}

        <div className="flex flex-row itmes-center w-full mt-5">
          {me && <span>{me.name}</span>}

          <input
            className="flex-1 bg-white border-gray-300 border-1 focus:px-2 rounded-md h-8 mr-3 focus:outline-none"
            type="text"
            value={tempComment}
            onChange={changeComment}
          />
          <button
            className="h-8 w-25 text-[14px] rounded-md bg-[#5F7D7D] hover:bg-[#435b5b] cursor-pointer text-white"
            onClick={saveComment}
          >
            댓글 등록
          </button>
        </div>
      </div>
    </>
  );
}
export default Readonly;
