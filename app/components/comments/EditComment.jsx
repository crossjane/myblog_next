import React from "react";

const EditComment = ({id, name,tempComment, changeEditComment, editSaveComment, index }) => {
  return (
    <div>
      <div className="px-4 py-2 flex flex-col min-h-8 rounded-md ">
        <div className="mt-2">
          <strong className="text-gray-600 text-[13px]">
            {name}님
          </strong>
          <span className="ml-2 text-[12px] text-gray-500">
            2025-04-30 18:00
          </span>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-1">
            <p className="text-[13px] pt-3 break-all">
              <input
                type="text"
                className="boder-1 border-gray-400"
                value={tempComment}
                onChange={(e) => changeEditComment(e, index)}
              />
            </p>
          </div>
          <button
            className="h-6 w-15 text-[12px] rounded-md bg-[#5F7D7D] hover:bg-[#435b5b] cursor-pointer text-white"
            onClick={() => editSaveComment(id)}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
