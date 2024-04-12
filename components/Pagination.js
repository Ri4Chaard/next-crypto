import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { usePagination } from "../hooks/usePagination";

export const Pagination = ({ curPage, changePage, totalPages }) => {
    let pageArray = usePagination(totalPages, curPage);
    const leftPages = [2, 3, 4];
    const rightPages = [totalPages - 3, totalPages - 2, totalPages - 1];
    const pageCenterNums = [
        curPage - 2,
        curPage - 1,
        curPage,
        curPage + 1,
        curPage + 2,
    ];

    return (
        <div className="flex items-center justify-between border rounded-b border-cyan-600 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <div className="relative inline-flex items-center rounded-md border border-cyan-600 px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-50 hover:bg-cyan-600">
                    Previous
                </div>
                <div className="relative ml-3 inline-flex items-center rounded-md border border-cyan-600 px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-50 hover:bg-cyan-600">
                    Next
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <div className="relative inline-flex items-center rounded-l-md px-2 py-2 text-cyan-600 ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0">
                            <button
                                onClick={() => changePage(curPage - 1)}
                                disabled={curPage == 1 ? true : false}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        {totalPages > 10 && (
                            <div
                                className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                    curPage == 1 && "bg-cyan-600 text-white"
                                }`}
                                onClick={() => changePage(1)}
                            >
                                1
                            </div>
                        )}
                        {curPage < 4 &&
                            totalPages > 10 &&
                            leftPages.map((page) => (
                                <div
                                    key={page}
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == page &&
                                        "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() => changePage(page)}
                                >
                                    {page}
                                </div>
                            ))}
                        {curPage > 4 && totalPages > 10 && (
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-cyan-600 ring-1 ring-inset ring-cyan-600 focus:outline-offset-0">
                                ...
                            </span>
                        )}
                        {totalPages <= 10 ? (
                            pageArray.map((page) => (
                                <div
                                    key={page}
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == page &&
                                        "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() => changePage(page)}
                                >
                                    {page}
                                </div>
                            ))
                        ) : (
                            <>
                                {curPage > 3 &&
                                    curPage < totalPages - 2 &&
                                    pageCenterNums.map((page) => (
                                        <div
                                            key={page}
                                            className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                                curPage == page &&
                                                "bg-cyan-600 text-white"
                                            }`}
                                            onClick={() => changePage(page)}
                                        >
                                            {page}
                                        </div>
                                    ))}
                            </>
                        )}

                        {curPage > totalPages - 3 &&
                            totalPages > 10 &&
                            rightPages.map((page) => (
                                <div
                                    key={page}
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == page &&
                                        "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() => changePage(page)}
                                >
                                    {page}
                                </div>
                            ))}
                        {curPage < totalPages - 3 && totalPages > 10 && (
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-cyan-600 ring-1 ring-inset ring-cyan-600 focus:outline-offset-0">
                                ...
                            </span>
                        )}
                        {totalPages > 10 && (
                            <div
                                className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                    curPage == totalPages &&
                                    "bg-cyan-600 text-white"
                                }`}
                                onClick={() => changePage(totalPages)}
                            >
                                {totalPages}
                            </div>
                        )}
                        <div className="relative inline-flex items-center rounded-r-md px-2 py-2 text-cyan-600 ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0">
                            <button
                                onClick={() => changePage(curPage + 1)}
                                disabled={curPage == totalPages ? true : false}
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};
