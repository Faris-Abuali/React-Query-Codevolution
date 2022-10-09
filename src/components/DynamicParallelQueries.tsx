import React from 'react'
import { useQueries, useQuery } from 'react-query';
import { fetchSuperhero, fetchSuperhero1 } from '../API';

interface Props {
    heroIds: number[]
}

const DynamicParallel: React.FC<Props> = ({ heroIds }) => {

    // returns array of query results
    const queryResults = useQueries(
        heroIds.map((heroId: number) => {
            return {
                queryKey: ["superhero", heroId],
                queryFn: () => fetchSuperhero(heroId + "")
            }
        })
    );
    console.log({ queryResults });

    return (
        <div>DynamicParallel</div>
    )
}

export default DynamicParallel