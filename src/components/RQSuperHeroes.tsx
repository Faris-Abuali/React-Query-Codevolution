import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from 'react-query'
import { Link, useNavigate } from "react-router-dom";
import { fetchSuperheroes } from "../API";
import { useSuperHeroesData, useAddSuperHeroData } from "../hooks/useSuperHeroesData";

type Props = {}


const RQSuperHeroes = (props: Props) => {
  const [refetchInterval, setRefetchInterval] = useState<number | false>(5000);
  const [name, setName] = useState<string>('');
  const [alterEgo, setAlterEgo] = useState<string>('');

  const onSuccess = (data: any) => {
    // Keep polling data every 5 seconds unless the #of superheroes is 5
    if (data.data.length >= 5) {
      setRefetchInterval(false); //stop data polling
    }
  }

  const onError = (error: any) => {
    console.log('Error', error);
    setRefetchInterval(false); //stop data polling
  }

  const { isLoading, isFetching, data: superheroes, isError, error, refetch }
    = useSuperHeroesData(onSuccess, onError);

  const { mutate: postHero, isLoading: isLoadingPostHero } = useAddSuperHeroData();


  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>{(error as any)?.message}</h1>

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    postHero(hero);
  }
  return (
    <>
      <h1>RQ Super Heroes Page</h1>
      <section
        style={{ margin: '4rem 0' }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button
          onClick={handleAddHeroClick}
          disabled={isLoadingPostHero}
        >
          Add Hero
        </button>
      </section>
      <button onClick={() => refetch()}>Fetch heroes</button>
      {isFetching && <p>Fetching heroes...</p>}
      {
        superheroes?.data.map((hero: any) => (
          <div
            key={hero.id}
          >
            <Link to={`/rq-super-heroes/${hero.id}`}>
              <div key={hero.id}>{hero.name}</div>
            </Link>
          </div>
        ))
      }
      {/* {
        superheroes?.map((superhero: string) => (
          <div key={superhero}>{superhero}</div>
        ))
      } */}
    </>
  )
}

export default RQSuperHeroes;