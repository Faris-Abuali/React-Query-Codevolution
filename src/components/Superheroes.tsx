import React, { useState, useEffect } from "react";
import axiosOne from "../API/axios";

type Props = {}

const Superheroes = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        axiosOne.get("/superheroes").then((response: any) => {
            setData(response.data);
        }).catch((error: any) => {
            setError(error?.message);
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);

    if (isLoading) return <h2>Loading...</h2>
    if (error) return <h2>{error}</h2>

    return (
        <>
            <h1>Superheroes Page</h1>
            {data.map((hero: any) => (
                <div key={hero.id}>{hero.name}</div>
            ))}
        </>
    )
}

export default Superheroes