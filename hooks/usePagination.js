import { useMemo } from "react";

export const getPageCount = (totalCount, perPage) => {
    console.log(totalCount);
    console.log(perPage);
    console.log(Math.ceil(totalCount / perPage));
    return Math.ceil(totalCount / perPage);
};

export const getPagesArray = (totalPages, curPage) => {
    const pages = [];
    if (totalPages < 10) {
        console.log("worked 1");
        for (let i = 0; i < totalPages; i++) pages.push(i + 1);
        return pages;
    } else {
        console.log("worked 2");
        pages.push(curPage - 2, curPage - 1, curPage, curPage + 1, curPage + 2);
        return pages;
    }
};

export const usePagination = (totalPages, curPage) => {
    const getMemoPagesArray = useMemo(() => {
        return getPagesArray(totalPages, curPage);
    }, [totalPages, getPagesArray]);
    return getMemoPagesArray;
};
