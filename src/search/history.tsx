import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";

import './history.scss'


const History = () => {
    const [history, setHistory] = useState<String[]>([])

    useEffect(() => {
    const toto = ['Aviator', 'Avatar', 'Titanic', 'Gladiator'];
    setHistory(toto)
    }, []);

    return (
        <div className="wrapper-history">
            <p className="header-history">Recherches récentes</p>
            {history.map((f) => {
                return (
                    <div className="wrapper-item-history">
                        <p>{f}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default History;
