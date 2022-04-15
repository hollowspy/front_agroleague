import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { RequestsProvider } from '../Providers/request-service';
import './detailFilm.scss'
import ListingActors from "./listingActors";
import {Button, Rating } from "@mui/material";
import {FilmFullI} from "../Interfaces/film_full";




const DetailFilm = () => {
    const [fullFilm, setFullFilm] = useState<FilmFullI | null >(null)
    const [rating, setRating] = useState<number>(0);
    const params = useParams();


    useEffect(() => {
        const fetchData = async () => {
            if (params.id) {
                try {
                    const fetchAPI:FilmFullI = await RequestsProvider.getFullFilm(params.id.toString());
                    const data:FilmFullI = fetchAPI
                    const formattedData:FilmFullI = {
                        ...data,
                        Poster: data.Poster === 'N/A' ? 'https://via.placeholder.com/300x419' : data.Poster
                    }
                    setFullFilm(formattedData);
                    const formatRating = parseInt(formattedData.imdbRating, 10);
                    setRating((formatRating) / 2);
                } catch (e) {
                    console.error(e)
                }
            }
        }
        fetchData()
            .catch(console.error);
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
