import { useQuery, useQueryClient } from 'react-query'
import { fetchSuperhero, fetchSuperhero1 } from "../API";

export const useSingleHeroData = (heroId: number) => {
    const queryClient = useQueryClient();
    /**
     * queryClient instance has access to all the query keys (query cache), which we can access 
     * to set the initial data
     * */

    return useQuery(
        ["super-heroes", heroId],
        // () => fetchSuperhero(heroId),
        fetchSuperhero1,
        {
            refetchOnWindowFocus: false, //default is true
            // enabled: !!heroId,
            initialData: () => {
                const cachedHeroes = queryClient.getQueryData("super-heroes");
                const hero = (cachedHeroes as any).data.find(
                    (hero: any) => +hero.id === +heroId
                );

                if (hero) {
                    return {
                        data: hero
                    }
                }
                else {
                    return undefined;
                }
            }
        }
    );
}