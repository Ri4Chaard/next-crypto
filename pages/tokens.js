import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import Image from "next/image";
import Link from "next/link";
import { useFetching } from "../hooks/useFetching";
import { Pagination } from "../components/Pagination";
import { getPageCount } from "../hooks/usePagination";
import {
    ArrowPathIcon,
    Cog6ToothIcon,
    SignalIcon,
} from "@heroicons/react/20/solid";
import { FetchedTokens } from "../components/FetchedTokens";
import { Refresher } from "../components/Refresher";
import { Loader } from "../components/Loader";

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
        setPage(1);
    };

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <MainContainer>
            {isTokLoading ? (
                <div className="flex flex-col p-3 border-x border-b rounded-b border-cyan-600">
                    <Loader />
                </div>
            ) : (
                <>
                    <div className="flex items-center border-x justify-between border-cyan-600 text-white p-3 pb-6">
                        <div className="flex items-center">
                            <p className="mr-2">Show rows:</p>
                            <select
                                className="p-1 border rounded border-cyan-600 mr-2"
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
                                className="p-1 border rounded border-cyan-600 mr-2"
                                value={filter}
                                onChange={handleFilterInput}
                                placeholder="Type here.."
                            />
                        </div>
                        <div className="flex items-center text-cyan-600">
                            <Refresher
                                tokError={tokError}
                                upDate={upDate}
                                setRefresh={setRefresh}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col border-x border-cyan-600 items-center">
                        <FetchedTokens
                            filteredTokens={filteredTokens}
                            perPage={perPage}
                            page={page}
                        />
                    </div>
                    <div className="flex items-center justify-between border rounded-b border-cyan-600 px-4 py-3 sm:px-6">
                        <Pagination
                            curPage={page}
                            changePage={changePage}
                            totalPages={totalPages}
                        />
                    </div>
                </>
            )}
        </MainContainer>
    );
};

export default Tokens;
