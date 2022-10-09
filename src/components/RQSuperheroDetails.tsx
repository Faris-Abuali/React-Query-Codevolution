import React from 'react'
import { useParams } from 'react-router-dom'
import { useSingleHeroData } from '../hooks/useSingleHeroData'

type Props = {}

const RQSuperHeroDetails = (props: Props) => {

    const { heroId } = useParams();
    const { data: hero, isError, error, isLoading } = useSingleHeroData(heroId ? +heroId : 0);

    if (isLoading) return <h2>Loading Hero Details...</h2>
    if (isError) return <h2>{(error as any).message}</h2>

    return (
        <main>
            {hero?.data.name} - {hero?.data.alterEgo}
        </main>
    )
}

export default RQSuperHeroDetails