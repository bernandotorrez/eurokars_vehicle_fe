import axios from "axios"

export const $axios = (token = '') => {
    const config = useRuntimeConfig();

    const axiosInstance = axios.create({
        baseURL: config.public.apiGatewayURL,
        headers: {
            get: {
                'Eurokars-Auth-Token': token
            },
            post: {
                'Eurokars-Auth-Token': token
            },
            put: {
                'Eurokars-Auth-Token': token
            },
            delete: {
                'Eurokars-Auth-Token': token
            }
        },
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
            // Access token has expired, refresh it
            try {
                //const newAccessToken = await refreshAccessToken();
                // Update the request headers with the new access token
                //error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                // Retry the original request
                const refreshToken = useCookie('eurokars-auth-refresh-token').value;
                const newAccessToken = await $fetch(config.public.apiGatewayURL+'/v1/auth/refresh-token', {
                    method: 'PUT',
                    headers: {
                        'eurokars-auth-refresh-token': refreshToken
                    },
                    onResponse(context) {
                        const authToken = context.response.headers.get('eurokars-auth-token')
                        error.config.headers['Eurokars-Auth-Token'] = authToken;
                    }
                })

                return axiosInstance(error.config);
            } catch (refreshError) {
                // Handle token refresh error
                throw refreshError;
            }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance
}