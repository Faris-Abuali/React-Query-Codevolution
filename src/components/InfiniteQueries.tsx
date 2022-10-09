import React, { Fragment } from 'react'
import { fetchColorsInfinite } from '../API'
import { useQuery, useInfiniteQuery } from 'react-query';

type Props = {}

const InfiniteQueries = (props: Props) => {

    const { isLoading, isError, error, data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ["colors"],
        fetchColorsInfinite, {
        getNextPageParam: (lastPage, pages) => {
            if (pages.length < 4) {
                return pages.length + 1;
            }
            return undefined; // this will set `hasNextPage` to false
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{(error as any).message}</div>;

    return (
        <>
            <main>
                {
                    data?.pages.map((group: any, index: number) => (
                        <Fragment key={index}>
                            {
                                group.data.map((color: any) => (
                                    <h2 key={color?.id}>{color.id}. {color.label}</h2>
                                ))
                            }
                        </Fragment>
                    ))
                }
            </main>
            <section>
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    Load more..
                </button>
            </section>
            {isFetching && !isFetchingNextPage ? <div>Fetching...</div> : null}
        </>
    )
}

export default InfiniteQueries