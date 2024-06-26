import { MainContainer } from "../components/MainContainer";
import coingecko from "../icons/coingecko.png";
import next from "../icons/nextjs.png";
import chart from "../icons/chart.png";
import tailwind from "../icons/tailwindcss.png";
import github from "../icons/github.png";
import Image from "next/image";

const Index = () => {
    return (
        <MainContainer>
            <div className="border-x border-b border-solid rounded-b border-cyan-600 p-3 mb-28">
                <h1 className="text-3xl font-bold mb-3">Hello there!</h1>
                <div className="flex justify-between">
                    <div className="w-1/4 flex flex-col m-8">
                        <Image src={coingecko} width={100} />
                        <Image src={next} width={100} className="self-end" />
                        <Image src={tailwind} width={100} />
                        <Image src={chart} width={100} className="self-end" />
                    </div>
                    <div className="w-3/4 text-lg self-center">
                        <h2 className="text-2xl mb-3 font-bold">About</h2>
                        <p className="px-8 pt-8 mb-8">
                            This is a project where I first tried out the
                            <span className="text-cyan-600">
                                {" Coingecko API"}
                            </span>
                            ,{" "}
                            <span className="text-cyan-600">{" Next.js"}</span>,{" "}
                            <span className="text-cyan-600">
                                {" TailwindCSS"}
                            </span>
                            , and{" "}
                            <span className="text-cyan-600">{" Chart.js"}</span>
                            . Tokens from the "Tokens" tab are written to local
                            storage, so data can be updated on demand, and this
                            also limits the constant fetching of the same tokens
                            to avoid hitting the constant "To many requests"
                            error. For each token, you can view a small amount
                            of data, such as its current price, price change
                            over 24 hours, the highest and lowest price of the
                            token over 24 hours, a chart of price changes over
                            30 days, the markets where the token is traded, and
                            its description. Enjoy!
                        </p>
                        <div className="flex justify-center items-center">
                            <Image src={github} width={50} className="mr-4" />

                            <a
                                href="https://github.com/Ri4Chaard"
                                target="_blank"
                            >
                                https://github.com/Ri4Chaard
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>
    );
};

export default Index;
