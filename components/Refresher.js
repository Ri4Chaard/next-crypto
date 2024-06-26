import React from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export const Refresher = ({ tokError, upDate, setRefresh }) => {
    return (
        <>
            {tokError ? (
                <p className="pr-2 text-red-700">{tokError.message}</p>
            ) : (
                <p className="pr-2 text-green-700">Updated successfully</p>
            )}
            <p className="pr-2">{upDate}</p>
            <ArrowPathIcon
                className="h-5 w-5 cursor-pointer"
                onClick={() => setRefresh(true)}
            />
        </>
    );
};
