import {FilmSearchI} from "../../Interfaces/film_search";
import {FilmHistoryI} from "../../Interfaces/film_history";
import { RequestsProvider } from '../Providers/request-service';

import './search.scss'

import Results from "./results";
import History from './history'

import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";

const axios = require('axios');




export interface FormValuesI {
    title:string;
}

const Search = () => {

    const defaultValues:FormValuesI = {
        title: ''
    };
    const [formValues, setFormValues] = useState<FormValuesI>(defaultValues);
    const [resultSearch, setResultSearch] = useState<FilmSearchI[]>([]);
    const [isSearchDone, setIsDone]= useState<boolean>(false);
    const [displayHistory, setDisplayHistory] = useState<boolean>(false);
    const [history, setHistory] = useState<FilmHistoryI[]>([])

    useEffect(() => {
        const localValues = localStorage.getItem("history");
        if (localValues) {
            const values:FilmHistoryI[] = Array.from(JSON.parse(localValues));
            console.log('values', values)
            setHistory(values);
        }
    }, []);


   const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // try {
        //     const url = `http://www.omdbapi.com/?apikey=f4eecfeb&type=movie&s=${formValues.title}`;
        //     const fetchAPI = await axios.get(url);
        //     const data:FilmSearchI[] = fetchAPI.data.Search
        //     setResultSearch(data);
        //     setIsDone(true);
        //     setDisplayHistory(false)
        // } catch (error) {
        //     console.error(error);
        // }
       try {
           const fetchAPI = await RequestsProvider.searchFilms(formValues.title);
           const data:FilmSearchI[] = fetchAPI.Search
           setResultSearch(data);
           setIsDone(true);
           setDisplayHistory(false)

       } catch (error) {
           console.error(error)
       }
    };

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const copyDefaultValue = { ... defaultValues};
        copyDefaultValue.title = e.target.value
        setFormValues(copyDefaultValue)

    };


    const getMargin =() => {
        return (displayHistory)
            ? 'input-field display-history'
            : 'input-field'
    }


    const displayResult = () => {
        return <Results
            addFilmToHistory={addFilmToHistory}
            resultSearch={resultSearch}
            isSearchDone={isSearchDone}/>
    }


    const addFilmToHistory = (film:FilmSearchI) => {
        const copyHistory:FilmHistoryI[] = [...history]
        if (copyHistory.length === 4) {
            copyHistory.pop()
        };
        const dataStorage = {
            title: film.Title,
            id: film.imdbID
        };
        copyHistory.push(dataStorage)
        copyHistory.reverse();
        setHistory(copyHistory);
        localStorage.setItem("history", JSON.stringify(copyHistory));
    }


    return (
        <div className='wrapper-search'>
            <p>
                Vous recherchez un film ?? Entrer le nom d'un film pour voir les résultats
            </p>
            <div className="wrapper-form">
                <form onSubmit={handleSubmit}>
                    <div className={getMargin()}>
                        <TextField
                            id="name-input"
                            name="title"
                            label="titre du film"
                            type="text"
                            value={formValues.title}
                            onClick={() => setDisplayHistory(true)}
                            onChange={handleInputChange}
                        />
                        {displayHistory && (
                            <History history={history}/>
                        ) }
                    </div>
                    <Button variant="contained" color="secondary" type="submit">
                        Rechercher
                    </Button>
                </form>
            </div>
            {displayResult()}

        </div>
    )


};

export default Search;
