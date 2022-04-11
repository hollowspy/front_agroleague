import React, {useState} from 'react';
import './results.scss'
import { useNavigate, useLocation } from "react-router-dom";


const Results = ({isSearchDone, resultSearch} : any) => {

    const navigate = useNavigate();

    const SelectFilm = (f:any) => {

        navigate(`film/${f.imdbID}`, {
            state: {
                filmId: f.imdbID,
            }
        });
        // return <MyClassComponent {...props} navigate={navigate} />;
        console.log(f)
    }

    const displayResult =() => {
        if (!isSearchDone) {
            return (
                <div>
                    <p>Une fois la recherche effectuée, vos resultats seront affichés</p>
                </div>
            )
        }
        if ((resultSearch && resultSearch.length === 0) || !resultSearch) {
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
                            <div onClick={() => SelectFilm(f)} className="card-film">
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
