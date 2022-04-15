import {resAPISearch} from "../Interfaces/api";
import {AxiosResponse} from "axios";
import {FilmFullI} from "../Interfaces/film_full";
import {FilmSearchI} from "../Interfaces/film_search";

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
     * @param title: title of the films related to the search
     * @param page related to the search (if pagination)
     * @returns {Promise<resAPISearch>}
     */
    searchFilms: async (title: string, page:number): Promise<resAPISearch> => {
        const params:ParamsSearchFilmI = {
            title,
            page
        };
        return new Promise((resolve, reject) => {
            HttpService.get('films/', { params}).then((res: AxiosResponse<resAPISearch>) => {
                resolve(res.data);
            }).catch((e: any) => {
                reject(e);
            });
        });
    },
    
    /**
     *
     * @param id: id of the related film. In string
     * @returns {Promise<FilmFullI>}
     */
    getFullFilm: async (id:string): Promise<FilmFullI> => {
        return new Promise((resolve, reject) => {
            HttpService.get(`films/${id}`).then((res: AxiosResponse<FilmFullI>) => {
                resolve(res.data);
            }).catch((e: any) => {
                reject(e);
            })
        })
    }


}
