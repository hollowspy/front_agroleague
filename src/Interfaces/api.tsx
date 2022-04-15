import {FilmSearchI} from "./film_search";

export interface resAPISearch extends FilmSearchI {
   Response: string;
   totalResults: string;
   Search: FilmSearchI[]
}

