import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainContainer } from "../../components/MainContainer";
import { useFetching } from "../../hooks/useFetching";
import { Loader } from "../../components/Loader";
import ethLogo from "../../icons/eth.png";
import Image from "next/image";
import { MarketChart } from "../../components/MarketChart";
import { Refresher } from "../../components/Refresher";
import { getPageCount } from "../../hooks/usePagination";
import { Pagination } from "../../components/Pagination";
import {
    ArrowDownRightIcon,
    ArrowUpRightIcon,
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
    HomeIcon,
} from "@heroicons/react/20/solid";
import { TokenMarkets } from "../../components/TokenMarkets";

export default function () {
    const [token, setToken] = useState();
    const [marketCharts, setMarketCharts] = useState();
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const { query } = useRouter();
    const axios = require("axios");
    const [fetchToken, isTokLoading, tokError] = useFetching(async (url) => {
        const response = await axios.get(url);
        setToken(response.data);
        setTotalPages(getPageCount(response.data.tickers.length, perPage));
    });
    const [fetchMarketCharts, isMarketChartsLoading, marketChartsError] =
        useFetching(async (url) => {
            const response = await axios.get(url);
            setMarketCharts(response.data);
        });

    useEffect(() => {
        if (query.id) {
            fetchToken(
                `https://api.coingecko.com/api/v3/coins/${query.id}?vs_currency=usd&include_market_cap=true&include_24h_vol=true&include_24h_change=true&include_last_updated_at=true`
            );
            fetchMarketCharts(
                `https://api.coingecko.com/api/v3/coins/${query.id}/market_chart?vs_currency=usd&days=30&interval=daily&precision=full`
            );
        }
        setRefresh(false);
    }, [query.id, refresh]);

    useEffect(() => {
        setPage(1);
        if (token) setTotalPages(getPageCount(token.tickers.length, perPage));
    }, [perPage]);

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <MainContainer>
            {isTokLoading ? (
                <div className="flex flex-col p-3 border-x border-b border-solid rounded-b border-cyan-600">
                    <Loader />
                </div>
            ) : (
                <>
                    {tokError && (
                        <h2 className="flex justify-center items-center text-3xl h-96 border-x border-b border-solid border-cyan-600 rounded-b">
                            {tokError.message}
                        </h2>
                    )}
                    {token && (
                        <div className="border-x border-b border-solid rounded border-cyan-600 p-3 mb-28">
                            <div className="flex justify-between ">
                                <h1 className="text-3xl">
                                    {token.name}
                                    <span className="ml-3 text-slate-400">
                                        {token.symbol.toUpperCase()}
                                    </span>
                                </h1>
                                <div className="flex text-cyan-600 items-center">
                                    <Refresher
                                        tokError={tokError}
                                        setRefresh={setRefresh}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between border-b border-solid border-cyan-600 pb-2 mb-3">
                                <div className="flex flex-col w-1/3">
                                    <img
                                        className="w-24 h-24 mb-3"
                                        src={token.image.large}
                                    />
                                    <div className="flex items-center mb-3">
                                        <p className="text-3xl mr-2">
                                            $
                                            {
                                                token.market_data.current_price
                                                    .usd
                                            }
                                        </p>
                                        {token.market_data
                                            .price_change_percentage_24h < 0 ? (
                                            <ArrowDownRightIcon className="w-5 h-5 text-red-700" />
                                        ) : (
                                            <ArrowUpRightIcon className="w-5 h-5 text-green-700" />
                                        )}
                                        <p
                                            className={
                                                token.market_data
                                                    .price_change_percentage_24h <
                                                0
                                                    ? "text-red-700"
                                                    : "text-green-700"
                                            }
                                        >
                                            {token.market_data.price_change_percentage_24h.toFixed(
                                                4
                                            )}
                                            %{" (24h)"}
                                        </p>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-slate-400">
                                            Highest & Lowest {" (24h)"}
                                        </p>
                                        <div className="flex">
                                            <div className="flex items-center mr-1 text-green-700">
                                                <ChevronDoubleUpIcon className="w-5 h-5" />
                                                <p>
                                                    $
                                                    {
                                                        token.market_data
                                                            .high_24h.usd
                                                    }
                                                </p>
                                            </div>
                                            <div className="flex items-center text-red-700">
                                                <ChevronDoubleDownIcon className="w-5 h-5" />
                                                <p>
                                                    $
                                                    {
                                                        token.market_data
                                                            .low_24h.usd
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-slate-400">
                                            Categories
                                        </p>
                                        <div className="flex flex-wrap items-center w-2/3">
                                            {token.categories.map(
                                                (category) => (
                                                    <span className="text-xs m-1 p-1 bg-cyan-600 border border-solid border-cyan-600 rounded-lg">
                                                        {category}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    {token.platforms.ethereum && (
                                        <div className="mb-3">
                                            <p className="text-slate-400">
                                                Contract
                                            </p>
                                            <div className="flex items-center">
                                                <Image
                                                    className="mr-2"
                                                    src={ethLogo}
                                                    width={20}
                                                    height={20}
                                                    alt="eth"
                                                />
                                                <p className="text-xs">
                                                    {token.platforms.ethereum}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <HomeIcon className="w-5 h-5 mr-2 text-slate-400" />
                                        <a
                                            href={token.links.homepage[0]}
                                            target="_blank"
                                        >
                                            {token.links.homepage[0]}
                                        </a>
                                    </div>
                                </div>
                                <div className="w-2/3">
                                    {isMarketChartsLoading ? (
                                        <Loader />
                                    ) : (
                                        <>
                                            {marketChartsError ? (
                                                <div className="flex justify-center items-center h-96 text-3xl text-red-700">
                                                    {marketChartsError.message}
                                                </div>
                                            ) : (
                                                <MarketChart
                                                    prices={marketCharts.prices}
                                                    token={token.name}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <h2 className="text-2xl font-bold">
                                        {token.name} Markets
                                    </h2>
                                    <div className="flex items-center">
                                        <p className="pr-2">Show rows:</p>
                                        <select
                                            className="p-1 border border-solid rounded border-cyan-600"
                                            name="count"
                                            onChange={(e) =>
                                                setPerPage(e.target.value)
                                            }
                                        >
                                            {[10, 15, 20, 25].map((val) => (
                                                <option
                                                    key={val}
                                                    selected={
                                                        val == perPage
                                                            ? true
                                                            : false
                                                    }
                                                    value={val}
                                                >
                                                    {val}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <TokenMarkets
                                    token={token}
                                    perPage={perPage}
                                    page={page}
                                />
                                <div className="flex items-center justify-between border-y border-solid border-cyan-600 px-4 py-3 mb-3 sm:px-6">
                                    <Pagination
                                        curPage={page}
                                        changePage={changePage}
                                        totalPages={totalPages}
                                    />
                                </div>
                            </div>

                            {token.description.en && (
                                <div className="">
                                    <h2 className="text-2xl font-bold mb-2">
                                        About {token.name}
                                    </h2>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: token.description.en,
                                        }}
                                    ></p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </MainContainer>
    );
}
