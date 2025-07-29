import db from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function Home() {
  const querySnapshot = await getDocs(collection(db, "category"));

  const newCategories = [];
  querySnapshot.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    console.log(data);
  });

  return <div>ㅇㅇ</div>;
}
