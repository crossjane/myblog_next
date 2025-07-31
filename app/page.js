import db from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import React from "react";
import GetBoards from "./components/getBoards";


export default async function Home() {
  // useEffect는 컴포넌트에서 빈 html만 들고오기 때문에 임의로 해줘야 하는것인가 ?
  // 그럼 useClient 에서는 useEffect를 안하면 실행이 안되고 ,ssr은 저절로 되는차이?
  // 아니면 함수를 감싸주냐 아니냐의ㅏ 차이?
  // ssr에서는 그냥 애초에 useEffect르 ㄹ할 필요가 없는것인가?
  // 하나의 함수로 못나누고 나열?

  // params가져오기(동적라우터 ): 클릭할떄마다. 컴포넌트로 뺴기 ? 파일구조 []로 해야해서 . 아니면
  // 이렇게 합쳐도 되나 ?보통 어떻게 하는지.

  // 카테고리 load(tab)
  const querySnapshot = await getDocs(collection(db, "category"));
  const getCategories = [];
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    getCategories.push({ id, ...data });
  });

  console.log("카테고리 ", getCategories);

  // 클릭한 카테고리의 board list 가져오기
  const q = query(collection(db, "category", "OfLdJf7dkBswF0756yBw", "board"));
  const querySnapshotData = await getDocs(q);
  const getBoards = [];
  querySnapshotData.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    getBoards.push({
      id,
      ...data,
      createdAt: data.createdAt?.toDate()?.toISOString() ?? null,
    });
  });

  console.log("보드 ", getBoards);

  return (
    <>
      <GetBoards getBoards={getBoards} getCategories={getCategories} />
    </>
  );
}
