import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import './history.scss'
import {FilmHistoryI} from "../Interfaces/film_history";



const History = ({history}: {
    history: FilmHistoryI[]
}) => {
    const navigate = useNavigate();

    const onNavigateToFilm = (f: FilmHistoryI) => {
        navigate(`film/${f.id}`, {
            state: {
                filmId: f.id,
            }
        });
    }

    const displayHistory = () => {
        if (history.length === 0) {
            return (
                <p className="no-history"> Vous n'avez effectué aucune recherche pour le moment</p>
            )
        }
        return (
            history.map((f: FilmHistoryI, index:number) => {
                return (
                    <div key={index} onClick={() => onNavigateToFilm(f)} className="wrapper-item-history">
                        <p>{f.title}</p>
                    </div>
                )
            })
        )

    }

    return (
        <div className="wrapper-history">
            <p className="header-history">Recherches récentes</p>
            {displayHistory()}
        </div>
    )
}

export default History;
