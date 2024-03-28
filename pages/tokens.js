import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import Image from "next/image";
import Link from "next/link";
import { useFetching } from "../hooks/useFetching";

const Tokens = () => {
    const [tokens, setTokens] = useState([]);

    const axios = require("axios");
    const [fetchTokens, isTokLoading, tokError] = useFetching(async (url) => {
        const response = await axios.get(url);
        setTokens(response.data);
    });

    useEffect(() => {
        fetchTokens(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
        );
    }, []);

    const myLoader = ({ src }) => {
        return src;
    };
    console.log(tokError);
    console.log(tokens);

    return (
        <MainContainer>
            {isTokLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    {tokError && <h2>{tokError.message}</h2>}
                    {tokens.map((token) => (
                        <Link key={token.id} href={`/tokens/${token.id}`}>
                            <div>
                                <h2>{token.name}</h2>
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
                </div>
            )}
        </MainContainer>
    );
};

export default Tokens;
