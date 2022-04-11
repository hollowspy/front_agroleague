import React, {useEffect, useState} from 'react';

import './history.scss'
import {useNavigate} from "react-router-dom";


const History = ({history}: any) => {
    const navigate = useNavigate();

    const onNavigateToFilm = (f: any) => {
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
            history.map((f: any) => {
                return (
                    <div onClick={() => onNavigateToFilm(f)} className="wrapper-item-history">
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
