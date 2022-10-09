import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:4000"
});

// This is axios interceptor that will be called before every request. 👇
// The function accepts all the options that axios accespts.
export const request = ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`;
    const onSuccess = (response: any) => response;
    const onError = (error: any) => {
        if (error.response.status === 401) {
            // redirect to /login
        }
        return Promise.reject(error.response || error.message);
    };

    return client(options).then(onSuccess).catch(onError);
}