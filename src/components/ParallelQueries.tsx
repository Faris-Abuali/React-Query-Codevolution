import React from 'react'
import { useQuery } from 'react-query';
import { fetchFriends, fetchSuperheroes } from '../API';

type Props = {}

const ParallelQueries = (props: Props) => {

    const { data: superheroes } = useQuery("super-heroes", fetchSuperheroes);
    const { data: friends } = useQuery("friends", fetchFriends);

    return (
        <div>ParallelQueries</div>
    )
}

export default ParallelQueries