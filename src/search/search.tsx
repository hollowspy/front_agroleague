import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// Services
import {RequestsProvider} from '../Providers/request-service';

// CSS
import './search.scss'

// Components
import Results from "./results/results";
import History from "./history/history";

// Interfaces
import {resAPISearch} from "../Interfaces/api";
import {FilmSearchI} from "../Interfaces/film_search";
import {FilmHistoryI} from "../Interfaces/film_history";


export interface FormValuesI {
    title: string;
}

const Search = () => {
    
    const defaultValues: FormValuesI = {
        title: ''
    };
    const [formValues, setFormValues] = useState<FormValuesI>(defaultValues);
    const [resultSearch, setResultSearch] = useState<FilmSearchI[]>([]);
    const [isSearchDone, setIsDone] = useState<boolean>(false);
    const [displayHistory, setDisplayHistory] = useState<boolean>(false);
    const [history, setHistory] = useState<FilmHistoryI[]>([])
    const [countPagination, setCountPagination] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    useEffect(() => {
        const localValues = localStorage.getItem("history");
        if (localValues) {
            const values: FilmHistoryI[] = Array.from(JSON.parse(localValues));
            setHistory(values);
        }
    }, []);
    
    
    const checkImgData = (listFilm: any): FilmSearchI[] => {
        const formattedFilm = listFilm.map((film: FilmSearchI) => {
            const urlPoster = (film.Poster === 'N/A') ? 'https://via.placeholder.com/150x222' : film.Poster;
            return {
                ...film,
                Poster: urlPoster
            }
        })
        return formattedFilm
    }
    
    const fethDataAPI = async (page: number): Promise<void> => {
        try {
            const fetchAPI: resAPISearch = await RequestsProvider.searchFilms(formValues.title, page);
            const data: FilmSearchI[] = fetchAPI.Search
            const formattedData = await checkImgData(data);
            console.log('formattedData', formattedData);
            setResultSearch(formattedData);
            setIsDone(true);
            setDisplayHistory(false)
            if (!countPagination) {
                const totalPages = Math.ceil((parseInt(fetchAPI.totalResults, 10) / data.length));
                setCountPagination(totalPages);
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        setCurrentPage(1)
        event.preventDefault();
        await fethDataAPI(1);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const copyDefaultValue = {...defaultValues};
        copyDefaultValue.title = e.target.value
        setFormValues(copyDefaultValue)
        
    };
    
    
    const getMargin = (): string => {
        return (displayHistory)
            ? 'input-field display-history'
            : 'input-field'
    }
    
    
    const addFilmToHistory = (film: FilmSearchI): void => {
        const copyHistory: FilmHistoryI[] = [...history]
        if (copyHistory.length === 4) {
            copyHistory.pop()
        }
        ;
        const dataStorage = {
            title: film.Title,
            id: film.imdbID
        };
        copyHistory.push(dataStorage)
        copyHistory.reverse();
        setHistory(copyHistory);
        localStorage.setItem("history", JSON.stringify(copyHistory));
    }
    
    const handleChangePage = async (event: React.ChangeEvent<unknown>, value: number): Promise<void> => {
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
                        )}
                    </div>
                    <Button variant="contained" color="secondary" type="submit">
                        Rechercher
                    </Button>
                </form>
            </div>
            {isSearchDone && (
                <Results
                    addFilmToHistory={addFilmToHistory}
                    resultSearch={resultSearch}
                    isSearchDone={isSearchDone}/>
            )}
            {isSearchDone && countPagination && (
                <div className="wrapper-pagination">
                    <Stack spacing={2}>
                        <Pagination
                            onChange={handleChangePage}
                            count={countPagination}/>
                    </Stack>
                </div>
            )}
        </div>
    )
    
    
};

export default Search;
