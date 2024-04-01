import Head from "next/head";
import Link from "next/link";
import styles from "../styles/menu.module.scss";

export const MainContainer = ({ children }) => {
    return (
        <>
            <Head>
                <title>Crypto app</title>
            </Head>
            <div className={styles.menu}>
                <div className={styles.menu__content}>
                    <header className={styles.head}>
                        <Link href="/">Main</Link>
                        <Link href="/tokens">Tokens</Link>
                    </header>
                    {children}
                </div>
            </div>
        </>
    );
};
