import React, {useState} from 'react';
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
    const [displayHistory, setDisplayHistory] = useState<boolean>(true)

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        console.log(formValues);
        try {
            const url = `http://www.omdbapi.com/?apikey=f4eecfeb&type=movie&s=${formValues.title}`;
            console.log('url', url);
            const fetchAPI = await axios.get(url);
            setResultSearch(fetchAPI.data.Search);
            setIsDone(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e:any) => {
        console.log('e', e);
        const copyDefaultValue = { ... defaultValues};
        copyDefaultValue.title = e.target.value
        setFormValues(copyDefaultValue)
    };

    const detectClick = () => {
        console.log('toto');
    }

    const getMargin =() => {
        return (displayHistory)
            ? 'input-field display-history'
            : 'input-field'
    }


    const displayResult = () => {
        return <Results resultSearch={resultSearch} isSearchDone={isSearchDone}/>
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
                            onClick={() => console.log('tata')}
                            onChange={handleInputChange}
                        />
                    <History />
                    </div>
                    <Button variant="contained" color="secondary" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
            {displayResult()}
        </div>
    )


};

export default Search;
