import React from 'react';
import { useNavigate } from "react-router-dom";

//CSS
import './results.scss'

// Interface
import {FilmSearchI} from "../../Interfaces/film_search";




const Results = ({isSearchDone, resultSearch, addFilmToHistory} : {
    isSearchDone: boolean,
    resultSearch: FilmSearchI[],
    addFilmToHistory: Function
}) => {
    const navigate = useNavigate();

    const selectFilm = (f:FilmSearchI) => {
        navigate(`film/${f.imdbID}`, {
            state: {
                filmId: f.imdbID,
            }
        });
    }

    const displayResult = () => {
        if (isSearchDone && ((resultSearch && resultSearch.length === 0) || !resultSearch)) {
            return (
                <div>
                    <p>Votre recherche n'a donné aucun résultat. Veuillez recommencer</p>
                </div>
            )
        }
        return (
            <div>
                <div className="wrapper-results">
                {resultSearch.map((f:FilmSearchI, index:number) => {
                    return (
                            <div key={index} onClick={() => {addFilmToHistory(f); selectFilm(f)}} className="card-film">
                                <p>{f.Title}</p>
                                <img src={f.Poster} alt="Poster of film"/>
                            </div>
                    )
                })}
                </div>
            </div>
        )
    }

    return (
        <div>
            {displayResult()}
        </div>
    )

};

export default Results;
