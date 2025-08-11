import db from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React from "react";
import BoardWrapper from "../../../components/Boards/BoardWrapper";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

export default async function BoardDetail({ params }) {
  const { boardId, categoryId } = await params;

  const docRef = doc(db, "category", categoryId, "board", boardId);
  const docSnap = await getDoc(docRef);

  let board = null;

  if (docSnap.exists()) {
    const id = docSnap.id;
    const data = docSnap.data();
    const formatBoard = {
      id,
      ...data,
      createdAt: data.createdAt?.toDate?.().toISOString() || null,
    };

    const userRef = doc(db, "users", formatBoard.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      formatBoard.user = { ...userSnap.data() };
    }

    board = formatBoard;
  }

  // 댓글 불러오기

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
      createdAt: data.createdAt?.toDate?.().toISOString() || null,
      isEdit: false,
      tempComment: "",
      likeId: "",
      bookmarkId: "",
    };

    comments.push(formatComment);
  });

  console.log("댓글!!!", comments);
  return board ? (
    <BoardWrapper boardData={board} commentData={comments} />
  ) : (
    <div>"존재하지 않는 게시글 입니다."</div>
  );
}
