"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function BoardItem({
  id,
  categoryId,
  title,
  withoutHtml,
  createdAt,
  likeCount,
}) {
  const router = useRouter();
  return (
    <div
      className="flex flex-col border-b border-gray-300 py-4"
      onClick={() => router.push(`/board/${categoryId}/${id}`)}
    >
      <div className="flex mt-3 flex-row items-center mb-4">
        <h2 className="flex mr-3 font-medium text-[22px] text-gray-600 text-left">
          {title}
        </h2>
        <span className="flex text-sm text-gray-500">
          {createdAt ? new Date(createdAt).toLocaleString() : ""}
        </span>
      </div>

      <div className="flex flex-row flex-wrap">
        <div className="flex flex-1">
          <p className="text-gray-700 text-[15px] line-clamp-3 leading-5 w-[95%] text-left">
            {withoutHtml} <br />
          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-[3px]">{likeCount}</div>
          <Image
            width={20}
            height={10}
            src="/full_heart.svg"
            alt="빈하트"
            className="w-5"
          />
        </div>
      </div>
    </div>
  );
}
