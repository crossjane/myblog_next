"use client";
import { auth, authAction, authSelector } from "@/features/auth/slice";
import db from "@/firebase";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { getApp } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { me } = useSelector(authSelector.getMe);

  function login() {
    router.push("/login");
  }

  async function logout() {
    try {
      const auth = getAuth();
      const result = await signOut(auth);
      dispatch(authAction.updateUser(null));
      alert("로그아웃되었습니다.");
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  }

  async function getMe() {
    if (me) {
      return;
    }
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          dispatch(authAction.updateMe({ uid, ...userSnap.data() }));
        }
      } else {
        alert("로그인 정보가 없습니다.");
        router.push("/login");
      }
    });
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <div className="w-full flex justify-end px-6 py-2">
        {me && (
          <p className="mr-8 leading-relaxed text-[15px]">
            {me.name}님 환영합니다.
          </p>
        )}
        {me && (
          <button
            className="text-[#5F7D7D] font-semibold text-[16px] rounded-md border-2 px-4 pb-1 mr-4 cursor-pointer hover:bg-[#e6ecec]"
            style={{ fontFamily: '"Josefin Slab"' }}
            onClick={() => navigate("/mypage")}
          >
            my page
          </button>
        )}
        {me ? (
          <button
            className="text-[#5F7D7D] font-semibold text-[16px] rounded-md border-2 px-4 cursor-pointer hover:bg-[#e6ecec]"
            style={{ fontFamily: '"Josefin Slab"' }}
            onClick={logout}
          >
            logout
          </button>
        ) : (
          <button
            className="text-[#5F7D7D] font-semibold text-[16px] rounded-md border-2 px-4 pb-1 cursor-pointer hover:bg-[#e6ecec]"
            style={{ fontFamily: '"Josefin Slab"' }}
            onClick={login}
          >
            login
          </button>
        )}
      </div>
      <div className="flex flex-col justify-center items-center mb-6">
        <b
          className="font-medium font-josefin tracking-wide text-[50px] mb-7 text-[#5F7D7D] cursor-pointer mt-20"
          style={{ fontFamily: '"Josefin Slab", serif' }}
        >
          Jane's Blog
        </b>
        Jane의 front-end 기술 블로그 입니다.
        <Image
          src="/line_keyboard.png"
          alt="메인 헤더 키보드 이미지"
          width={320}
          height={200}
          priority
          className="cursor-pointer"
          style={{ width: 320, height: 200 }}
        />
      </div>
    </>
  );
}
export default Header;
