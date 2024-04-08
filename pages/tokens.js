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
    const [perPage, setPerPage] = useState(6);
    const [totalPages, setTotalPages] = useState(0);

    const axios = require("axios");
    const [fetchTokens, isTokLoading, tokError] = useFetching(
        async (url, perPage) => {
            const response = await axios.get(url, {
                params: {
                    per_page: perPage,
                    page: page,
                },
            });
            setTokens(response.data);
            setTotalPages(getPageCount(100, perPage));
        }
    );

    useEffect(() => {
        fetchTokens(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc",
            // "https://jsonplaceholder.typicode.com/posts",
            perPage
        );
    }, [page, perPage]);

    const changePage = (page) => {
        setPage(page);
    };

    const myLoader = ({ src }) => {
        return src;
    };
    console.log(tokError);
    console.log(tokens);
    console.log(totalPages);

    return (
        <MainContainer>
            {isTokLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <div className={styles.tokens}>
                        {tokError && (
                            <h2 className="flex flex-1 justify-center items-center text-3xl">
                                {tokError.message}
                            </h2>
                        )}
                        {tokens.map((token) => (
                            <Link
                                key={token.id}
                                className={styles.tokens__content}
                                href={`/tokens/${token.id}`}
                            >
                                <div className={styles.tokens__token}>
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
