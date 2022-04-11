import React, {useState} from 'react';
import './results.scss'
import { useNavigate, useLocation } from "react-router-dom";


const Results = ({isSearchDone, resultSearch, history, addFilmToHistory} : any) => {
    const navigate = useNavigate();

    const selectFilm = (f:any) => {
        setTimeout(() => {
            navigate(`film/${f.imdbID}`, {
                state: {
                    filmId: f.imdbID,
                }
            });
        })
    }

    const displayResult =() => {
        if (isSearchDone && (resultSearch && resultSearch.length === 0) || !resultSearch) {
            return (
                <div>
                    <p>Votre recherche n'a donné aucun résultat. Veuillez recommencer</p>
                </div>
            )
        }
        return (
            <div>
                <div className="wrapper-results">
                {resultSearch.map((f:any) => {
                    return (
                            <div onClick={() => {addFilmToHistory(f); selectFilm(f)}} className="card-film">
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
