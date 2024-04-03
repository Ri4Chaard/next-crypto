import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export const Pagination = ({ curPage, changePage }) => {
    const pageArray = [
        curPage - 2,
        curPage - 1,
        curPage,
        curPage + 1,
        curPage + 2,
    ];

    console.log(pageArray);

    return (
        <div className="flex items-center justify-between border-t border-cyan-600 px-4 py-3 sm:px-6">
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
                        <div
                            className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                curPage == 1 && "bg-cyan-600 text-white"
                            }`}
                            onClick={() => changePage(1)}
                        >
                            1
                        </div>
                        {curPage < 4 && (
                            <>
                                <div
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == 2 && "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() => changePage(2)}
                                >
                                    2
                                </div>
                                <div
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == 3 && "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() => changePage(3)}
                                >
                                    3
                                </div>
                                <div
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == 4 && "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() => changePage(4)}
                                >
                                    4
                                </div>
                            </>
                        )}
                        {curPage > 4 && (
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-cyan-600 ring-1 ring-inset ring-cyan-600 focus:outline-offset-0">
                                ...
                            </span>
                        )}
                        {curPage > 3 &&
                            curPage < Math.ceil(100 / 6) - 2 &&
                            pageArray.map((page) => (
                                <div
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == page &&
                                        "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() => changePage(page)}
                                >
                                    {page}
                                </div>
                            ))}
                        {curPage > Math.ceil(100 / 6) - 3 && (
                            <>
                                <div
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == Math.ceil(100 / 6) - 3 &&
                                        "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() =>
                                        changePage(Math.ceil(100 / 6) - 3)
                                    }
                                >
                                    {Math.ceil(100 / 6) - 3}
                                </div>
                                <div
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == Math.ceil(100 / 6) - 2 &&
                                        "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() =>
                                        changePage(Math.ceil(100 / 6) - 2)
                                    }
                                >
                                    {Math.ceil(100 / 6) - 2}
                                </div>
                                <div
                                    className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                        curPage == Math.ceil(100 / 6) - 1 &&
                                        "bg-cyan-600 text-white"
                                    }`}
                                    onClick={() =>
                                        changePage(Math.ceil(100 / 6) - 1)
                                    }
                                >
                                    {Math.ceil(100 / 6) - 1}
                                </div>
                            </>
                        )}
                        {curPage < Math.ceil(100 / 6) - 3 && (
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-cyan-600 ring-1 ring-inset ring-cyan-600 focus:outline-offset-0">
                                ...
                            </span>
                        )}
                        <div
                            className={`cursor-pointer relative hidden items-center px-4 py-2 text-cyan-600 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex ${
                                curPage == Math.ceil(100 / 6) &&
                                "bg-cyan-600 text-white"
                            }`}
                            onClick={() => changePage(Math.ceil(100 / 6))}
                        >
                            {Math.ceil(100 / 6)}
                        </div>
                        <div className="relative inline-flex items-center rounded-r-md px-2 py-2 text-cyan-600 ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0">
                            <button
                                onClick={() => changePage(curPage + 1)}
                                disabled={
                                    curPage == Math.ceil(100 / 6) ? true : false
                                }
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
