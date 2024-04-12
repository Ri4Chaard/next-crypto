import Head from "next/head";
import Link from "next/link";
import styles from "../styles/menu.module.scss";

export const MainContainer = ({ children }) => {
    return (
        <>
            <Head>
                <title>Crypto app</title>
            </Head>
            <div className="flex">
                <div className=" container mx-auto ">
                    <header className="flex mt-28 p-3 justify-around border rounded-t border-cyan-600">
                        <Link href="/">Main</Link>
                        <Link href="/tokens">Tokens</Link>
                    </header>
                    {children}
                </div>
            </div>
        </>
    );
};
