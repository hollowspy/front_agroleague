import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import {ListSubheader} from "@mui/material";


const ListingActors = ({actors}:any) => {

    const [arrActors, setArrActors] = useState<any>([]);

    useEffect(() => {
        const formatActors = actors.split(',');
        setArrActors(formatActors)
    }, [])

    const onMoreInfo = (actor:string) => {
        const url = `https://fr.wikipedia.org/wiki/${actor}`;
        window.open(url);
    }
    return (
        <div>
            <List  subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Acteurs
                </ListSubheader>
            }>
                {arrActors.map((a: string, index: number) => {
                    return <ListItem key={index}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText onClick={() => onMoreInfo(a)} primary={a} />
                        </ListItemButton>
                    </ListItem>
                })}
            </List>
        </div>
    )
};

export default ListingActors
