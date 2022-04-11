import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";

import './detailFilm.scss'
import axios from "axios";
import ListingActors from "./listingActors";
import {Button, Link, Rating, Tooltip} from "@mui/material";



const DetailFilm = (props: any) => {
    const [fullFilm, setFullFilm] = useState<any>(null)
    const [rating, setRating] = useState<number>(0);
    const location = useLocation();
    const params = useParams();


    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
            const id = params.id;
            const url = `http://www.omdbapi.com/?apikey=f4eecfeb&i=${id}`;
            const fetchAPI = await axios.get(url);
            setFullFilm(fetchAPI.data);
            const formatRating = parseInt(fetchAPI.data.imdbRating, 10);
            setRating((formatRating) / 2);
        }
        fetchData()
            .catch(console.error);;
    }, [])


    return (
        <div>
            {fullFilm &&
                <div className="wrapper-detail-film">
                    <div className="header-film">
                        <p>{fullFilm.Title}</p>
                    </div>
                    <div className="wrapper-infos">
                        <img src={fullFilm.Poster} alt="poster-fim"/>
                        <div className="block-infos">
                            <p>{fullFilm.Released} / {fullFilm.Runtime} / {fullFilm.Genre} </p>
                            <ListingActors actors={fullFilm.Actors}/>
                            <p>Réalisateur : {fullFilm.Writer}</p>
                            <div className="rating">
                                <Rating name="read-only" value={rating} precision={0.1} readOnly />
                                <p>{rating} / 5</p>
                            </div>
                        </div>
                    </div>
                    <div className="synopsys-info">
                        <p className="header-synopsys">Synopsys : </p>
                        <p>{fullFilm.Plot}</p>
                    </div>
                    <div className="block-cta">
                        <Button variant="text"
                                target="_blank"
                                href={`https://fr.wikipedia.org/wiki/${fullFilm.Title}`}>
                            En savoir encore plus ....
                        </Button>
                        <Button variant="contained" href="/">Revenir à la recherche</Button>
                    </div>
                </div>
            }
        </div>
    )

};

export default DetailFilm;
