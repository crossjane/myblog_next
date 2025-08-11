import db from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React from "react";
import BoardWrapper from "../../../components/Boards/BoardWrapper";

export default async function Comment({ params }) {
  const { boardId, categoryId } = await params;

  const q = query(
    collection(db, "category", categoryId, "board", boardId, "comment"),
    orderBy("createdAt", "asc")
  );
  const commentData = await getDocs(q);
  let comments = [];
  commentData.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();

    const formatComment = {
      id,
      ...data,
      isEdit: false,
      tempComment: "",
      likeId: "",
      bookmarkId: "",
    };

    comments.push(formatComment);
  });

  console.log("댓글 불러오기", comments);

  return board ? (
    <BoardWrapper
      commentData={comments}
      boardId={boardId}
      categoryId={categoryId}
    />
  ) : (
    <div>"존재하지 않는 게시글 입니다."</div>
  );
}
