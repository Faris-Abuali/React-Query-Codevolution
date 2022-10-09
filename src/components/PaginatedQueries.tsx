import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { fetchColors } from '../API';


type Props = {}

const PaginatedQueries = (props: Props) => {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(1);

    const { isLoading, isFetching, isError, error, data } = useQuery(
        ["colors", pageNumber],
        fetchColors, {
        keepPreviousData: true,
        onSuccess: (data) => {
            // console.log(data.headers["x-total-count"]);
            setTotalCount(Number(data.headers["x-total-count"]));
        }
    }
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{(error as any).message}</div>;


    return (
        <>
            <main>
                {
                    data?.data.map((color: any) => (
                        <div key={color?.id}>
                            <h2>{color?.name} - {color?.label}</h2>
                        </div>
                    ))
                }
            </main>
            <section>
                <button
                    onClick={() => setPageNumber(page => page - 1)}
                    disabled={pageNumber === 1}
                >
                    Previous Page
                </button>
                <button
                    onClick={() => setPageNumber(page => page + 1)}
                    disabled={pageNumber === (totalCount / 2)}
                    // 2 is the limit in each page
                >
                    Next Page
                </button>
            </section>
            {isFetching && <div>Fetching page {pageNumber}...</div>}
        </>
    )
}

export default PaginatedQueries