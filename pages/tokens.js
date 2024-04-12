import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import Image from "next/image";
import Link from "next/link";
import { useFetching } from "../hooks/useFetching";
import styles from "../styles/menu.module.scss";
import { Pagination } from "../components/Pagination";
import { getPageCount } from "../hooks/usePagination";

const Tokens = () => {
    const [tokens, setTokens] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [upDate, setUpDate] = useState();
    const [refresh, setRefresh] = useState(false);
    const [filter, setFilter] = useState("");
    const [filteredTokens, setFilteredTokens] = useState([]);

    const axios = require("axios");
    const [fetchTokens, isTokLoading, tokError] = useFetching(async (url) => {
        const response = await axios.get(url);
        setTokens(response.data);
        setFilteredTokens(response.data);
        setTotalPages(getPageCount(100, perPage));
        setErr(tokError.message);
    });

    useEffect(() => {
        fetchTokens(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc",
            perPage
        );
        let date = new Date();
        setUpDate(
            `Last update: ${date.getDate() < 10 ? "0" : ""}${date.getDate()}.${
                date.getMonth() < 10 ? "0" : ""
            }${date.getMonth() + 1} at ${
                date.getHours() < 10 ? "0" : ""
            }${date.getHours()}:${
                date.getMinutes() < 10 ? "0" : ""
            }${date.getMinutes()}`
        );
        setRefresh(false);
        setFilter("");
    }, [refresh, perPage]);

    const handleFilterInput = (e) => {
        const searchToken = e.target.value;
        setFilter(searchToken);
        const filteredTokens = tokens.filter((token) =>
            token.name.toLowerCase().includes(searchToken.toLowerCase())
        );
        setFilteredTokens(filteredTokens);
        setTotalPages(getPageCount(filteredTokens.length, perPage));
    };

    console.log(filter);

    const changePage = (page) => {
        setPage(page);
    };

    const myLoader = ({ src }) => {
        return src;
    };

    console.log(filteredTokens);
    console.log(tokens);
    console.log(totalPages);

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
                        <div className="flex">
                            <p className="pr-2">Tokens per page:</p>
                            <select
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
                        <div className="flex">
                            <p className="pr-2">Search</p>
                            <input
                                value={filter}
                                onChange={handleFilterInput}
                                placeholder="Type here.."
                            />
                        </div>
                        <div className="flex">
                            <p className="pr-2">{tokError.message}</p>
                            <p className="pr-2">{upDate}</p>
                            <div
                                className="cursor-pointer"
                                onClick={() => setRefresh(true)}
                            >
                                O
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-3 border-x border-cyan-600">
                        {filteredTokens
                            .slice(perPage * page - perPage, perPage * page)
                            .map((token) => (
                                <Link
                                    key={token.id}
                                    className="flex flex-col items-center"
                                    href={`/tokens/${token.id}`}
                                >
                                    <div className="flex flex-row-reverse justify-between items-center p-3 w-1/2 h-24">
                                        <h2 className="text-xl">
                                            {token.name}
                                        </h2>
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
