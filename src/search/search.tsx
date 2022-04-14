import {FilmSearchI} from "../../Interfaces/film_search";
import {FilmHistoryI} from "../../Interfaces/film_history";
import { RequestsProvider } from '../Providers/request-service';

import './search.scss'

import Results from "./results";
import History from './history'

import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import events from "node:events";

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
    const [countPagination, setCountPagination] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const localValues = localStorage.getItem("history");
        if (localValues) {
            const values:FilmHistoryI[] = Array.from(JSON.parse(localValues));
            console.log('values', values)
            setHistory(values);
        }
    }, []);
    
    const fethDataAPI = async (page:number) => {
        try {
            console.log('page', page);
            const fetchAPI = await RequestsProvider.searchFilms(formValues.title, page);
            const data:FilmSearchI[] = fetchAPI.Search
            setResultSearch(data);
            setIsDone(true);
            setDisplayHistory(false)
            if (!countPagination) {
                const totalPages =  Math.ceil((parseInt(fetchAPI.totalResults, 10) / data.length));
                console.log('totalPages', totalPages)
                setCountPagination(totalPages);
            }
        } catch (error) {
            console.error(error)
        }
    }


   const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       await fethDataAPI(currentPage);
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
    
        const handleChangePage = async (event:React.ChangeEvent<unknown>, value:number) => {
        setCurrentPage(value);
        await fethDataAPI(value);
    }


    return (
        <div className='wrapper-search'>
            <p>
                Vous recherchez un film ?? Entrer le nom d'un film pour voir les résultats. Mais oui super
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
            {isSearchDone && countPagination && (
                <div className="wrapper-pagination">
                    <Stack spacing={2}>
                        <Pagination
                            onChange={handleChangePage}
                            count={countPagination} />
                    </Stack>
                </div>
            )}
        </div>
    )


};

export default Search;
