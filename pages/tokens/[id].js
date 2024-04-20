import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainContainer } from "../../components/MainContainer";
import { useFetching } from "../../hooks/useFetching";
import { Loader } from "../../components/Loader";
import ethLogo from "../../icons/eth.png";
import Image from "next/image";
import { MarketChart } from "../../components/MarketChart";

export default function () {
    const [token, setToken] = useState();
    const [marketCharts, setMarketCharts] = useState();

    const { query } = useRouter();
    const axios = require("axios");
    const [fetchToken, isTokLoading, tokError] = useFetching(async (url) => {
        const response = await axios.get(url);
        setToken(response.data);
    });
    const [fetchMarketCharts, isMarketChartsLoading, marketChartsError] =
        useFetching(async (url) => {
            const response = await axios.get(url);
            setMarketCharts(response.data);
        });
    console.log(query.id);

    useEffect(() => {
        if (query.id) {
            fetchToken(
                `https://api.coingecko.com/api/v3/coins/${query.id}?vs_currency=usd&include_market_cap=true&include_24h_vol=true&include_24h_change=true&include_last_updated_at=true`
            );
            fetchMarketCharts(
                `https://api.coingecko.com/api/v3/coins/${query.id}/market_chart?vs_currency=usd&days=30&interval=daily&precision=full`
            );
        }
    }, [query.id]);

    console.log(token);
    console.log(marketCharts);

    return (
        <MainContainer>
            {isTokLoading ? (
                <div className="flex flex-col p-3 border-x border-b rounded-b border-cyan-600">
                    <Loader />
                </div>
            ) : (
                <>
                    {tokError && (
                        <h2 className="flex justify-center items-center text-3xl h-96 border-x border-b border-cyan-600 rounded-b">
                            {tokError.message}
                        </h2>
                    )}
                    {token && (
                        <div className="border-x border-cyan-600 p-3">
                            <h1 className="text-3xl">
                                {token.name}
                                <span className="ml-3 text-slate-400">
                                    {token.symbol.toUpperCase()}
                                </span>
                            </h1>
                            <div className="flex justify-between border-b border-cyan-600 pb-2 mb-3">
                                <div className="flex flex-col w-1/3">
                                    <img
                                        className="w-24 h-24"
                                        src={token.image.large}
                                    />
                                    <p className="text-3xl mr-3">
                                        ${token.market_data.current_price.usd}
                                    </p>
                                    <p>
                                        {token.market_data.price_change_percentage_24h.toFixed(
                                            2
                                        )}
                                        %{"(24h)"}
                                    </p>
                                    <p>
                                        High 24h: $
                                        {token.market_data.high_24h.usd}
                                    </p>
                                    <p>
                                        Low 24h: $
                                        {token.market_data.low_24h.usd}
                                    </p>
                                    <div className="flex flex-wrap items-center w-2/3 mb-3">
                                        {token.categories.map((category) => (
                                            <span className="text-xs m-1 p-1 bg-cyan-600 border border-cyan-600 rounded-lg">
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                    {token.platforms.ethereum && (
                                        <div className="mb-3">
                                            <p>Contract</p>
                                            <div className="flex items-center">
                                                <Image
                                                    className="mr-2"
                                                    src={ethLogo}
                                                    width={20}
                                                    height={20}
                                                    alt="eth"
                                                />
                                                <p className="text-xs text-slate-400">
                                                    {token.platforms.ethereum}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        Homepage:
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
                                        <MarketChart
                                            prices={marketCharts.prices}
                                            token={token.name}
                                        />
                                    )}
                                </div>
                            </div>

                            {token.tickers.slice(0, 10).map((ticker, index) => (
                                <div className="flex flex-col items-center w-full odd:bg-slate-800">
                                    <a
                                        className="flex  justify-between items-center p-6 w-full h-8"
                                        href={ticker.trade_url}
                                        target="_blank"
                                    >
                                        <div className="flex">
                                            <p>{index + 1}</p>
                                            <h3>{ticker.market.name}</h3>
                                            <p>
                                                {ticker.base}/{ticker.target}
                                            </p>
                                        </div>
                                        <div>
                                            <p>${ticker.last}</p>
                                        </div>
                                        <div>
                                            <p>${ticker.volume}</p>
                                        </div>
                                    </a>
                                </div>
                            ))}

                            {token.description.en && (
                                <div>
                                    <h2 className="text-2xl">
                                        About {token.name}
                                    </h2>
                                    <p>{token.description.en}</p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </MainContainer>
    );
}
