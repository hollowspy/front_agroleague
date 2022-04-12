const axios = require('axios');

const HttpService = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 30000,
});



export const RequestsProvider = {
    /**
     * Retrieve worker requests
     * @returns {Promise<any>}
     */
    searchFilms: async (title: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            HttpService.get('films/', { params: { title }}).then((res: any) => {
                resolve(res.data);
            }).catch((e: any) => {
                reject(e);
            });
        });
    },

    getFullFilm: async (id:string): Promise<any> => {
        return new Promise((resolve, reject) => {
            HttpService.get(`films/${id}`).then((res: any) => {
                resolve(res.data);
            }).catch((e: any) => {
                reject(e);
            })
        })
    }


}
