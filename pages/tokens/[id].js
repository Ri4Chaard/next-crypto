import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainContainer } from "../../components/MainContainer";

export default function () {
    const [token, setToken] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { query } = useRouter();
    const axios = require("axios");
    console.log(query.id);

    useEffect(() => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${query.id}?vs_currency=usd&include_market_cap=true&include_24h_vol=true&include_24h_change=true&include_last_updated_at=true`
            )
            .then((response) => {
                setToken(response.data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [query.id]);

    console.log(token);

    return (
        <MainContainer>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <div>
                        <h1>{token.name}</h1>
                        {token.image && <img src={token.image.small} />}
                    </div>
                    <h2>{token.symbol}</h2>
                    {token.tickers && (
                        <div>Price: ${token.market_data.current_price.usd}</div>
                    )}
                </>
            )}
        </MainContainer>
    );
}
