import {
    ArrowDownRightIcon,
    ArrowUpRightIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

export const FetchedTokens = ({ filteredTokens, perPage, page }) => {
    return (
        <>
            <div className="flex justify-between items-center border-b border-cyan-600 px-6 w-full text-slate-400">
                <div className="flex flex-row-reverse w-2/6 justify-end items-center">
                    <h2 className="text-xl text-left">Name</h2>

                    <p className="text-xl w-8 mr-5">#</p>
                </div>
                <p className="w-1/12 text-right">Current price</p>

                <p className="w-1/12 text-right">Price change</p>
                <p className="w-1/6 text-right">Market cup</p>
            </div>
            {filteredTokens
                .slice(perPage * page - perPage, perPage * page)
                .map((token, index) => (
                    <Link
                        key={token.id}
                        className="flex flex-col items-center w-full odd:bg-slate-800"
                        href={`/tokens/${token.id}`}
                    >
                        <div className="flex  justify-between items-center p-6 w-full h-24">
                            <div className="flex flex-row-reverse w-2/6 justify-end items-center">
                                <h2 className="text-xl text-left text-slate-400">
                                    {token.symbol.toUpperCase()}
                                </h2>
                                <h2 className="text-xl text-left mr-2">
                                    {token.name}
                                </h2>
                                <img
                                    className="w-12 h-12 mr-6"
                                    src={token.image}
                                    alt="not found"
                                />
                                <p className="text-xl w-8 mr-5">
                                    {perPage * page + index + 1 - perPage}
                                </p>
                            </div>
                            <p className="w-1/12 text-right">
                                ${token.current_price.toLocaleString("en-US")}
                            </p>
                            <div className="w-1/12 flex items-center justify-end">
                                {token.price_change_percentage_24h < 0 ? (
                                    <ArrowDownRightIcon className="w-5 h-5 text-red-700" />
                                ) : (
                                    <ArrowUpRightIcon className="w-5 h-5 text-green-700" />
                                )}
                                <p
                                    className={
                                        token.price_change_percentage_24h < 0
                                            ? " text-red-700"
                                            : " text-green-700"
                                    }
                                >
                                    {token.price_change_percentage_24h.toFixed(
                                        4
                                    )}
                                    %
                                </p>
                            </div>
                            <p className="w-1/6 text-right">
                                ${token.market_cap.toLocaleString("en-US")}
                            </p>
                        </div>
                    </Link>
                ))}
            {!filteredTokens.length && (
                <p className="flex justify-center items-center text-3xl h-96">
                    No tokens found
                </p>
            )}
        </>
    );
};
