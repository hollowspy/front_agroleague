import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import './search.scss'
import Results from "./results";
import History from './history'

const axios = require('axios');


const Search = () => {

    const defaultValues = {
        title: ''
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const [resultSearch, setResultSearch] = useState([]);
    const [isSearchDone, setIsDone]= useState<boolean>(false);
    const [displayHistory, setDisplayHistory] = useState<boolean>(false);
    const [history, setHistory] = useState<any>([])

    useEffect(() => {
        const localValues = localStorage.getItem("history");
        console.log('localValues', localValues);
        if (localValues) {
            const values = Array.from(JSON.parse(localValues));
            console.log('values', values);
            setHistory(values);
        }
    }, []);


   const handleSubmit = async (event:any) => {
        event.preventDefault();
        try {
            const url = `http://www.omdbapi.com/?apikey=f4eecfeb&type=movie&s=${formValues.title}`;
            const fetchAPI = await axios.get(url);
            setResultSearch(fetchAPI.data.Search);
            setIsDone(true);
            setDisplayHistory(false)
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e:any) => {
        const copyDefaultValue = { ... defaultValues};
        copyDefaultValue.title = e.target.value
        setFormValues(copyDefaultValue)

    };

    const detectClick = () => {
    }

    const getMargin =() => {
        return (displayHistory)
            ? 'input-field display-history'
            : 'input-field'
    }


    const displayResult = () => {
        return <Results
            addFilmToHistory={addFilmToHistory}
            history={history}
            resultSearch={resultSearch}
            isSearchDone={isSearchDone}/>
    }

    const addFilmToHistory = (film:any) => {
        const copyHistory = [...history]
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
