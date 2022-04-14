const axios = require('axios');

const HttpService = axios.create({
    baseURL: 'http://localhost:8089/',
    timeout: 30000,
});

export interface ParamsSearchFilmI {
    title: string;
    page: number;
}



export const RequestsProvider = {
    /**
     * Retrieve worker requests
     * @returns {Promise<any>}
     */
    searchFilms: async (title: string, page:number): Promise<any> => {
        const params:ParamsSearchFilmI = {
            title,
            page
        };
        return new Promise((resolve, reject) => {
            HttpService.get('films/', { params}).then((res: any) => {
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
