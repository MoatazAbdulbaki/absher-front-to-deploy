import React from "react";
import { globalConfigs } from "../../config";

// START // styles for pagination section
const paginationContainerStyle =
  "flex justify-between w-2/3 mt-8 lg:w-1/3 lg:border lg:border-white lg:rounded-md py-2 lg:px-4 mx-auto mb-3";
const numberStyle =
  "block text-white cursor-pointer rounded-lg w-[20px]  bg-main-skyblue text-center hover:text-main-yellow duration-200 selcet-none";
const textStyle =
  "block text-white cursor-pointer  hover:text-main-yellow duration-200 selcet-none";
const currentStyle =
  "block bg-main-yellow  duration-200 rounded-3xl text-black w-[20px] text-center selcet-none";
const disabledStyle =
  "cursor-not-allowed bg-zinc-500  text-zinc-800 hover:text-zinc-800";
// END // styles for pagination section

interface Props {
  currentPageNumber: number;
  totalPages: number;
  paginate: Function;
}

const Pagination: React.FC<Props> = ({
  currentPageNumber,
  paginate,
  totalPages,
}) => {
  const maxPageNumber = Math.ceil(totalPages / globalConfigs.ITEMS_PER_PAGE);
  return (
    <div className={paginationContainerStyle}>
      <button
        className={`${numberStyle} ${
          currentPageNumber === 1 ? disabledStyle : ""
        }`}
        onClick={() => paginate(1)}
        disabled={currentPageNumber === 1}
      >
        1
      </button>
      <button
        className={`${textStyle} ${
          currentPageNumber === 1 ? disabledStyle : ""
        }`}
        onClick={() => paginate(currentPageNumber - 1)}
        disabled={currentPageNumber === 1}
      >
        السابق
      </button>
      <button className={currentStyle}>{currentPageNumber}</button>
      <button
        className={`${textStyle} ${
          currentPageNumber === maxPageNumber ? disabledStyle : ""
        }`}
        onClick={() => paginate(currentPageNumber + 1)}
        disabled={currentPageNumber === maxPageNumber}
      >
        التالي
      </button>
      <button
        className={`${numberStyle} ${
          currentPageNumber === maxPageNumber ? disabledStyle : ""
        }`}
        onClick={() => paginate(maxPageNumber)}
        disabled={currentPageNumber === maxPageNumber}
      >
        {maxPageNumber}
      </button>
    </div>
  );
};

export default Pagination;
