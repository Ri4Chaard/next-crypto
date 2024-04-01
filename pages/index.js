import { MainContainer } from "../components/MainContainer";
import styles from "../styles/menu.module.scss";

const Index = () => {
    return (
        <MainContainer>
            <div className={styles.main}>
                <h1>Main page</h1>
                <p>
                    This is the main page, you can click on "Tokens" to see a
                    list of tokens!
                </p>
            </div>
        </MainContainer>
    );
};

export default Index;
