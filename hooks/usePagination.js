import { useMemo } from "react";

export const getPageCount = (totalCount, perPage) => {
    return Math.ceil(totalCount / perPage);
};

export const getPagesArray = (totalPages) => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) pages.push(i + 1);
    return pages;
};

export const usePagination = (totalPages, curPage) => {
    const getMemoPagesArray = useMemo(() => {
        return getPagesArray(totalPages, curPage);
    }, [totalPages, getPagesArray]);
    return getMemoPagesArray;
};
