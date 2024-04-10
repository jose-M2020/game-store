import {useQuery} from '@tanstack/react-query';
import apiClient from '../api';
import {useAuthContext} from "../context/AuthContext.jsx";

const getFetchData = async (url, token) => {
    const {data} = await apiClient.get(url, {
        headers: {
            ...token && {
                'Authorization': `Bearer ${token}`
            }
        }
    });
    return data;
}

export const useFetchQuery = (url = '', queryName = '') => {
    const {token} = useAuthContext();

    return useQuery({
        queryKey: [queryName],
        queryFn: () => getFetchData(url, token),
    });
}
