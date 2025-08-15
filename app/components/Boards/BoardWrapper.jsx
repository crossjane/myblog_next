"use client";

import React, { useEffect, useState } from "react";
import Readonly from "./Readonly";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { authSelector } from "@/features/auth/slice";
import EditBoard from "./EditBoard";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "@/firebase";

export default function BoardWrapper({ boardData, commentData }) {
  const [detailIsEdit, setDetailIsEdit] = useState(false);

  const [comments, setComments] = useState(commentData);
  const [tempDetailText, setTempDetailText] = useState("");
  const [tempDetailHtml, setTempDetailHtml] = useState("");
  const [tempTitle, setTempTitle] = useState("");
  const { categoryId, boardId } = useParams();
  const { me } = useSelector(authSelector.getMe);
  const [board, setBoard] = useState(boardData);

  // 어떻게 했는지 해석
  async function checkBoardLike() {
    const q = query(
      collection(db, "category", categoryId, "board", boardId, "like"),
      where("uid", "==", me.uid)
    );
    const data = await getDocs(q);
    data.forEach((doc) => {
      setBoard({ ...board, likeId: doc.id });
      return;
    });
  }
  useEffect(() => {
    if (board && me) {
      checkBoardLike();
    }
  }, [board, me]);

  const params = useParams();

  async function detailEditSave() {
    console.log("수정완료!");
    try {
      const docRef = doc(db, "category", categoryId, "board", boardId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() === false) {
        alert("게시글이 존재하지 않습니다.");
      }

      if (tempDetailHtml.trim().length === 0) {
        alert("게시물 내용을 작성해주세요.");
        return;
      }

      await updateDoc(docRef, {
        title: tempTitle,
        contents: tempDetailHtml,
        withoutHtml: tempDetailText,
      });

      setBoard((prev) => ({
        ...prev,
        title: tempTitle,
        contents: tempDetailHtml,
        withoutHtml: tempDetailText,
      }));

      setDetailIsEdit(false);
    } catch (error) {
      console.log(error.message, error.code, error);
      alert("글을 수정할 수 없습니다.");
    }
  }

  function detailEdit() {
    setTempDetailHtml(board.contents);
    setTempDetailText(board.withoutHtml);
    setTempTitle(board.title);
    setDetailIsEdit(true);
  }

  function changeTitle(e) {
    setTempTitle(e.target.value);
  }

  async function detailDelete() {
    if (window.confirm("이 글을 정말 삭제 하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "category", categoryId, "board", boardId));
        alert("삭제완료");
        navigate("/categories");
      } catch (error) {
        console.log("error", error);
        alert("글을 삭제 할 수 없습니다.");
      }
    } else {
      alert("취소");
    }
  }

  async function like() {
    try {
      //눌러진 like 가 없다면 newLike add, like 수 증가.
      //like count :board 에 likecount 생성 해서 저장 -> 증가/ 감소 시키기
      //
      if (!board.likeId) {
        const likeRef = collection(
          db,
          "category",
          categoryId,
          "board",
          boardId,
          "like"
        );

        const newLike = {
          uid: me.uid,
        };

        const docRef = await addDoc(likeRef, newLike);
        setBoard((prev) => ({ ...prev, likeId: docRef.id }));
        return;
      }

      await deleteDoc(
        doc(db, "category", categoryId, "board", boardId, "like", board.likeId)
      );
      setBoard({ ...board, likeId: "" });
    } catch (error) {
      console.log("error", error);
      alert("좋아요를 누를 수 없습니다.");
    }
  }

  return (
    <>
      {detailIsEdit ? (
        <EditBoard
          board={board}
          detailIsEdit={detailIsEdit}
          tempTitle={tempTitle}
          changeTitle={changeTitle}
          user={me}
          detailEditSave={detailEditSave}
          detailDelete={detailDelete}
          like={like}
          detailEdit={detailEdit}
          tempDetailHtml={tempDetailHtml}
          setTempDetailText={setTempDetailText}
          setTempDetailHtml={setTempDetailHtml}
          commentData={comments}
          boardId={boardId}
          categoryId={categoryId}
        />
      ) : (
        <Readonly
          board={board}
          detailIsEdit={detailIsEdit}
          tempTitle={tempTitle}
          changeTitle={changeTitle}
          user={me}
          detailEditSave={detailEditSave}
          detailDelete={detailDelete}
          like={like}
          detailEdit={detailEdit}
          tempDetailHtml={tempDetailHtml}
          setTempDetailText={setTempDetailText}
          setTempDetailHtml={setTempDetailHtml}
          commentData={comments}
          boardId={boardId}
          categoryId={categoryId}
        />
      )}
    </>
  );
}
