import "../styles/nullstyle.css";
import "../styles/globalstyle.css";
import { useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import { AppContext } from "../components/context";

export default function MyApp({ Component, pageProps }) {
    const [tokens, setTokens] = useState([]);
    const [upDate, setUpDate] = useState();
    const [refresh, setRefresh] = useState(false);
    const [filteredTokens, setFilteredTokens] = useState([]);

    const axios = require("axios");
    const [fetchTokens, isTokLoading, tokError] = useFetching(async (url) => {
        const response = await axios.get(url);
        setTokens(response.data);
        setFilteredTokens(response.data);
    });

    useEffect(() => {
        fetchTokens(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
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
    }, [refresh]);
    return (
        <AppContext.Provider
            value={{
                tokens,
                refresh,
                setRefresh,
                upDate,
                isTokLoading,
                tokError,
                filteredTokens,
                setFilteredTokens,
            }}
        >
            <Component {...pageProps} />
        </AppContext.Provider>
    );
}
