import db from "@/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import React from "react";
import HomeWrapper from "./components/HomeWrapper";
import moment from "moment";

export default async function Home({ searchParams }) {
  // 카테고리 load(tab)
  const searchParam = await searchParams;
  const categoryId = searchParam.categoryId;

  const querySnapshot = await getDocs(collection(db, "category"));
  const getCategories = [];
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    getCategories.push({ id, ...data });
  });

  // 좋아요가져오기

  // 클릭한 카테고리의 board list 가져오기
  const q = query(
    collection(
      db,
      "category",
      categoryId ? categoryId : "OfLdJf7dkBswF0756yBw",
      "board"
    ),
    orderBy("createdAt", "desc")
  );
  const querySnapshotData = await getDocs(q);
  const getBoards = [];
  querySnapshotData.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();

    getBoards.push({
      id,
      ...data,
      createdAt: data.createdAt
        ? moment(data.createdAt.toDate()).format("YYYY-MM-DD HH:mm:ss")
        : null,
    });
  });

  return <HomeWrapper getBoards={getBoards} getCategories={getCategories} />;
}
