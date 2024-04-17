import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import Image from "next/image";
import Link from "next/link";
import { useFetching } from "../hooks/useFetching";
import { Pagination } from "../components/Pagination";
import { getPageCount } from "../hooks/usePagination";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const Tokens = () => {
    const [tokens, setTokens] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [upDate, setUpDate] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [filter, setFilter] = useState("");
    const [filteredTokens, setFilteredTokens] = useState([]);

    const axios = require("axios");
    const [fetchTokens, isTokLoading, tokError] = useFetching(async (url) => {
        const response = await axios.get(url);
        setTokens(response.data);
        setFilteredTokens(response.data);
        localStorage.setItem("fetchedTokens", JSON.stringify(response.data));
        let date = new Date();
        const lastUpdate = `Last update: ${
            date.getDate() < 10 ? "0" : ""
        }${date.getDate()}.${date.getMonth() < 10 ? "0" : ""}${
            date.getMonth() + 1
        } at ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${
            date.getMinutes() < 10 ? "0" : ""
        }${date.getMinutes()}`;
        setUpDate(lastUpdate);
        localStorage.setItem("lastUpdate", JSON.stringify(lastUpdate));
    });

    useEffect(() => {
        const storedTokens = localStorage.getItem("fetchedTokens");
        const lastUpdate = localStorage.getItem("lastUpdate");
        if (storedTokens) {
            setTokens(JSON.parse(storedTokens));
            setFilteredTokens(JSON.parse(storedTokens));
            setUpDate(JSON.parse(lastUpdate));
        } else {
            fetchTokens(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
            );
        }
    }, []);

    useEffect(() => {
        if (refresh)
            fetchTokens(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
            );
        setRefresh(false);
        setFilter("");
    }, [refresh]);

    useEffect(() => {
        setPage(1);
        setFilter("");
        setTotalPages(getPageCount(100, perPage));
    }, [perPage]);

    const handleFilterInput = (e) => {
        const searchToken = e.target.value;
        setFilter(searchToken);
        const filteredTokens = tokens.filter((token) =>
            token.name.toLowerCase().includes(searchToken.toLowerCase())
        );
        setFilteredTokens(filteredTokens);
        setTotalPages(getPageCount(filteredTokens.length, perPage));
    };

    const changePage = (page) => {
        setPage(page);
    };
    const myLoader = ({ src }) => {
        return src;
    };

    return (
        <MainContainer>
            {isTokLoading ? (
                <div className="flex flex-col p-3 border-x border-b rounded-b border-cyan-600">
                    <h1 className="flex justify-center items-center text-3xl h-96">
                        Loading...
                    </h1>
                </div>
            ) : (
                <>
                    <div className="flex items-center border-x justify-between border-cyan-600 text-cyan-600 p-3">
                        <div className="flex items-center">
                            <p className="pr-2">Tokens per page:</p>
                            <select
                                className="p-1 border rounded border-cyan-600"
                                name="count"
                                onChange={(e) => setPerPage(e.target.value)}
                            >
                                {[5, 10, 15, 20, 25].map((val) => (
                                    <option
                                        key={val}
                                        selected={val == perPage ? true : false}
                                        value={val}
                                    >
                                        {val}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <p className="pr-2">Search for token</p>
                            <input
                                className="p-1 border rounded border-cyan-600"
                                value={filter}
                                onChange={handleFilterInput}
                                placeholder="Type here.."
                            />
                        </div>
                        <div className="flex items-center">
                            {tokError ? (
                                <p className="pr-2 text-red-700">
                                    {tokError.message}
                                </p>
                            ) : (
                                <p className="pr-2 text-green-700">
                                    Updated successfully
                                </p>
                            )}
                            <p className="pr-2">{upDate}</p>
                            <ArrowPathIcon
                                className="h-5 w-5 cursor-pointer"
                                onClick={() => setRefresh(true)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col p-3 border-x border-cyan-600 items-center">
                        {tokError ? (
                            <p className="flex justify-center items-center text-3xl h-96">
                                {"Error occured :("}
                            </p>
                        ) : (
                            <>
                                {filteredTokens
                                    .slice(
                                        perPage * page - perPage,
                                        perPage * page
                                    )
                                    .map((token) => (
                                        <Link
                                            key={token.id}
                                            className="flex flex-col items-center w-full odd:bg-slate-800"
                                            href={`/tokens/${token.id}`}
                                        >
                                            <div className="flex flex-row-reverse justify-between items-center p-3 w-full h-24">
                                                <h2 className="text-xl w-2/6 text-right">
                                                    {token.name}
                                                </h2>
                                                <p
                                                    className={
                                                        token.price_change_percentage_24h <
                                                        0
                                                            ? "w-1/6 text-right text-red-700"
                                                            : "w-1/6 text-right text-green-700"
                                                    }
                                                >
                                                    {token.price_change_percentage_24h.toFixed(
                                                        4
                                                    )}
                                                    %
                                                </p>
                                                <p className="w-1/6 text-right">
                                                    ${token.current_price}
                                                </p>
                                                <Image
                                                    loader={myLoader}
                                                    src={token.image}
                                                    width={50}
                                                    height={50}
                                                    alt="not found"
                                                    priority={false}
                                                    unoptimized={true}
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                {!filteredTokens.length && (
                                    <p className="flex justify-center items-center text-3xl h-96">
                                        No tokens found
                                    </p>
                                )}
                            </>
                        )}
                    </div>
                    <Pagination
                        curPage={page}
                        changePage={changePage}
                        totalPages={totalPages}
                    />
                </>
            )}
        </MainContainer>
    );
};

export default Tokens;
