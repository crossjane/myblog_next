import db from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

export async function generateMetadata({ params }) {
  const { categoryId, boardId } = await params;
  const docRef = doc(db, "category", categoryId, "board", boardId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const id = docSnap.id;
    const data = docSnap.data();
    return {
      title: data.title,
      description:
        data.withoutHtml.length > 200
          ? `${data.withoutHtml.substring(0, 50)}...`
          : data.withoutHtml,
    };
  }
}

export default async function BoardDetailLayout({ children }) {
  return <div>{children}</div>;
}
