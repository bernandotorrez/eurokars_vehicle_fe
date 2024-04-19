import axios from "axios"

export const $axios = () => {
    const config = useRuntimeConfig();

    const axiosInstance = axios.create({
        baseURL: config.public.apiGatewayURL,
    });

    axiosInstance.interceptors.request.use(function (config) {
        // Do something before request is sent
        const authToken = useCookie('eurokars-auth-token').value;
        const refreshToken = useCookie('eurokars-auth-refresh-token').value;

        config.headers['Eurokars-Auth-Token'] = authToken;
        config.headers['Eurokars-Auth-Refresh-Token'] = refreshToken;

        console.log('request', authToken)

        return config;
        }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
            // Access token has expired, refresh it
            try {
                // Retry the original request
                const refreshToken = useCookie('eurokars-auth-refresh-token').value;
                await $fetch(config.public.apiGatewayURL+'/v1/auth/refresh-token', {
                    method: 'PUT',
                    headers: {
                        'eurokars-auth-refresh-token': refreshToken
                    },
                    onResponse(context) {
                        const authToken = context.response.headers.get('eurokars-auth-token')
                        error.config.headers['Eurokars-Auth-Token'] = authToken;

                        const cookieAuthToken = useCookie('eurokars-auth-token');
                        cookieAuthToken.value = authToken;
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