import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export const Pagination = () => {
    return (
        <div className="flex items-center justify-between border-t border-cyan-600 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-cyan-600 px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-50 hover:bg-cyan-600"
                >
                    Previous
                </a>
                <a
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-cyan-600 px-4 py-2 text-sm font-medium text-gray-700 hover:text-teal-50 hover:bg-cyan-600"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </a>
                        <a
                            href="#"
                            aria-current="page"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600  hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                            1
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                            3
                        </a>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-cyan-600 ring-1 ring-inset ring-cyan-600 focus:outline-offset-0">
                            ...
                        </span>
                        <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                        >
                            8
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0"
                        >
                            9
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0"
                        >
                            10
                        </a>
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-cyan-600 hover:bg-cyan-600 hover:text-teal-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
};
