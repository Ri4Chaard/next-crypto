import Head from "next/head";
import Link from "next/link";

export const MainContainer = ({ children }) => {
    return (
        <>
            <Head>
                <title>Crypto app</title>
            </Head>
            <div className="flex">
                <div className=" container mx-auto ">
                    <header className="flex mt-28 p-3 justify-around border rounded-t text-xl text-center border-cyan-600">
                        <Link
                            href="/"
                            className="w-1/2 border-r border-cyan-600 hover:bg-slate-800"
                        >
                            Main
                        </Link>
                        <Link
                            href="/tokens"
                            className="w-1/2 hover:bg-slate-800"
                        >
                            Tokens
                        </Link>
                    </header>
                    {children}
                </div>
            </div>
        </>
    );
};
