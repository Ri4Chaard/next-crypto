import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";
import Image from "next/image";
import Link from "next/link";

const Tokens = () => {
    const [tokens, setTokens] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const axios = require("axios");

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
            )
            .then((response) => {
                setTokens(response.data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    const myLoader = ({ src }) => {
        return src;
    };

    console.log(tokens);

    return (
        <MainContainer>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
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
