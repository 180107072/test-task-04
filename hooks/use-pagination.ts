import { useState } from "react";

type Pagination = {
  pages: number;
  limit?: number;
};

export const usePagintaion = ({ pages, limit = 5 }: Pagination) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pagesCount = Math.ceil(pages / limit);

  const goto = (page: number) => setCurrentPage((prev) => page);

  const from = (currentPage - 1) * limit;
  const to = currentPage * limit;

  const range = [from, to];

  return {
    range,
    currentPage,
    pagesCount,
    goto,
  };
};
