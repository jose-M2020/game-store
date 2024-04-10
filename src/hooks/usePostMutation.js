import {useMutation} from '@tanstack/react-query';
import {useAuthContext} from "../context/AuthContext.jsx";
import apiClient from '../api';
import {toast} from "react-toastify";

export const usePostMutation = (options) => {
    const auth = useAuthContext();

    const mutation = useMutation({
        mutationFn: ({url, params, data, method = 'POST'}) => {
            const headers = {
                ...auth?.token && {
                    'Authorization': `Bearer ${auth?.token}`
                }
            };

            const methods = {
                'POST': () => apiClient.post(url, data, {
                    headers
                }),
                'PUT': () => apiClient.put(url, data, {
                    headers: {
                        ...headers,
                        'Content-Type': 'application/json',
                    }
                }),
            }

            return methods[method]()
        },
        onError: (error) => {
            toast.error("Hubo un error al realizar la operación!");
        },
        onSuccess: (response) => {
            if(options?.onSuccess){
                options.onSuccess(response);
            } else{
                console.log('success: ', response);
            }
        },
    });

    return mutation;
}
