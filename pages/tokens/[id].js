import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainContainer } from "../../components/MainContainer";
import { useFetching } from "../../hooks/useFetching";

export default function () {
    const [token, setToken] = useState();
    const [err, setErr] = useState("");

    const { query } = useRouter();
    const axios = require("axios");
    const [fetchToken, isTokLoading, tokError] = useFetching(async (url) => {
        const response = await axios.get(url);
        console.log(response);
        setToken(response.data);
        setErr(tokError.message);
    });
    console.log(query.id);

    useEffect(() => {
        fetchToken(
            `https://api.coingecko.com/api/v3/coins/${query.id}?vs_currency=usd&include_market_cap=true&include_24h_vol=true&include_24h_change=true&include_last_updated_at=true`
        );
    }, [query.id]);

    console.log(token);

    return (
        <MainContainer>
            {isTokLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {err && <h2>{err}</h2>}
                    {token && (
                        <>
                            <div>
                                <div>
                                    <h1>{token.name}</h1>
                                    <img src={token.image.small} />
                                    <h2>{token.symbol}</h2>
                                </div>
                                <div>
                                    <p>
                                        Current price: $
                                        {token.market_data.current_price.usd}
                                    </p>
                                    <p>
                                        Price change 24h: $
                                        {token.market_data.price_change_24h.toFixed(
                                            2
                                        )}
                                    </p>
                                    <p>
                                        High 24h: $
                                        {token.market_data.high_24h.usd}
                                    </p>
                                    <p>
                                        Low 24h: $
                                        {token.market_data.low_24h.usd}
                                    </p>
                                </div>
                            </div>
                            <p>{token.description.en}</p>

                            <div>
                                Homepage:
                                <a
                                    href={token.links.homepage[0]}
                                    target="_blank"
                                >
                                    {token.links.homepage[0]}
                                </a>
                            </div>
                        </>
                    )}
                </>
            )}
        </MainContainer>
    );
}
