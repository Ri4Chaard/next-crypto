import { useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer";

const Index = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );
            const jsonData = await response.json();
            setData(jsonData);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <MainContainer>
            <div>
                <h1>Main</h1>
                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    <ul>
                        {data.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                )}
                <br />
            </div>
        </MainContainer>
    );
};

export default Index;
