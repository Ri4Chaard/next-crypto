import Head from "next/head";
import Link from "next/link";

export const MainContainer = ({ children }) => {
    return (
        <>
            <Head>
                <title>Crypto app</title>
            </Head>
            <div>
                <Link href="/">Main</Link>
                <Link href="/tokens">Tokens</Link>
            </div>
            <div>{children}</div>
        </>
    );
};
