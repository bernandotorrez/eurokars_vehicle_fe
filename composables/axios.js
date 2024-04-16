import axios from "axios"

export const $axios = (token = '') => {
    const config = useRuntimeConfig()

    return axios.create({
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
        }
    });
}