import { useQuery, useMutation, useQueryClient } from 'react-query'
import { fetchSuperheroes, addSuperHero } from "../API";
import { request } from "../utils/axiosUtils";

// // Episode 25
// const fetchSuperheroes25 = () => {
//     return request({ url: "/superheroes" });
// }
// // Episode 25
// const addSuperHero25 = (hero: any) => {
//     return request({ url: "/superheroes", method: "POST", data: hero });
// }

export const useSuperHeroesData = (onSuccess: any, onError: any) => {
    return useQuery(
        "super-heroes",
        fetchSuperheroes, {
        onSuccess,
        onError,
        refetchOnWindowFocus: false, //default is true
        // select: (data) => {
        //     const heroesNames = data.data.map((hero: any) => hero.name);
        //     return heroesNames;
        // },
        // enabled: false,
    });
}

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient();
    // Unlike useQuery, useMutation doesn't necessarily need a key.
    // Similar to queryFn in useQuery, here we need to define a mutationFn.
    return useMutation(addSuperHero, {
        // onSuccess: (data: any) => {
        //     // data refers to the entire response for the POST request
        //     // queryClient.invalidateQueries("super-heroes");
        //     // // Invalidating the query whose queryKey is "super-heroes" will trigger the refetch in the background after the muatation succeed.

        //     // This function will update the cache with the new data. 👇
        //     queryClient.setQueryData("super-heroes", (oldQueryData: any) => {
        //         // We need to return the new value for the query cache:
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data, data.data],
        //         }
        //     })
        // },
        onMutate: async (newHero: any) => {
            // is called before the mutation function is fired and is passed the same variables the mutation function would receive.
            // This function is useful for updating the cache before the mutation is fired.
            await queryClient.cancelQueries("super-heroes");
            // Cancel any queries that are currently fetching or refetching to ensure that they don't overwrite our optimistic update. 👆
            const previousHeroes = queryClient.getQueryData("super-heroes");
            // Get the current value of the query cache. 👆 so that we can revert to it if the mutation fails.👆
            queryClient.setQueryData("super-heroes", (oldQueryData: any) => {
                // We need to return the new value for the query cache:
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, {
                        id: oldQueryData.data.length + 1,
                        ...newHero
                    }],
                }
                // The problem is that we don't have the id of the new hero yet. So we need to generate a temporary id for it. 👆
            });

            // In case something went wrong, to rollback/revert to the previous value of the query cache, we need to return the previous value of the query cache. 👇
            return {
                previousHeroes
            }
        },
        onError: (_err: any, _newHero: any, context: any) => {
            // is called if the mutation function throws an error.
            // This function is useful for reverting the cache to its previous state if the mutation fails.
            // rollback is the function that we returned from the onMutate function. 👇
            queryClient.setQueryData("super-heroes", context.previousHeroes);
        },
        onSettled: () => {
            // This function is called either if the mutation succeeds or fails.
            // All we have to do is to refetch the superheroes. 👇
            queryClient.invalidateQueries("super-heroes");
            // This will ensure that client-state is in sync with the server-state.
            // The user of course will not notice the difference.
        }
    });
}