import axiosOne from "./axios";

export const fetchSuperheroes = () => {
    return axiosOne.get("/superheroes");
}

export const fetchSuperhero = (heroId: string | undefined) => {
    return axiosOne.get(`/superheroes/${heroId}`);
}

export const fetchSuperhero1 = ({ queryKey }: any) => {
    return axiosOne.get(`/superheroes/${queryKey[1]}`);
}

export const fetchFriends = () => {
    return axiosOne.get("/friends");
}

export const fetchUserByEmail = (email: string) => {
    return axiosOne.get(`/users/${email}`);
}

export const fetchCoursesByChannelId = (channelId: string) => {
    return axiosOne.get(`/channels/${channelId}`);
}

export const fetchColors = ({ queryKey }: any) => {
    return axiosOne.get(`/colors?_limit=2&_page=${queryKey[1]}`);
}

export const fetchColorsInfinite = ({ queryKey, pageParam = 1 }: any) => {
    return axiosOne.get(`/colors?_limit=2&_page=${pageParam}`);
}

// -------------- POST --------------
export const addSuperHero = (hero: any) => {
    return axiosOne.post("/superheroes", hero);
}