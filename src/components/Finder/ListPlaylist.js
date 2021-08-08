import React, { useState, useEffect, Fragment } from "react"
import { Button, List, ListItem, Divider } from "@material-ui/core"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from "@material-ui/styles"
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import axios from "axios";

import {
    REMOVE_DATA_FROM_STORAGE
} from "../../utils/constants";

import { playerService } from "../playerService"

const { ipcRenderer } = window.require('electron')

function ListPlaylist({ playlistID, onClickBack, spotifyToken, playlistName }) {
    const [playlistSongs, setPlaylistSongs] = useState();

    useEffect(() => {
        axios({
            method: "GET",
            url: "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks",
            headers: {
                "Authorization": "Bearer " + spotifyToken
            }
        }).then((response) => {
            console.log("GET PLAYLIST", response.data);
            setPlaylistSongs(response.data.items);
        }).catch((error) => {
            if (error) {
                console.log(error.response);
                const err = error.response;
                console.log("ERRRR", err);
                if (err.data.error.status === 401) {
                    console.log("REMOVE");
                    ipcRenderer.send(REMOVE_DATA_FROM_STORAGE, "spotify_token");
                }
            }
        })
    }, [playlistID, spotifyToken])

    const clickOnSong = (songUri) => {
        console.log("CLICKED", songUri);

        axios({
            method: "PUT",
            url: "https://api.spotify.com/v1/me/player/play",
            headers: {
                "Authorization": "Bearer " + spotifyToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                "uris": [songUri]
            }
        }).then((response) => {
            console.log("PLay song", response.data);
            playerService.sendPath("spotify");
        }).catch((error) => {
            if (error) {
                console.log(error.response);
                const err = error.response;
                console.log("ERRRR", err);
                if (err.data.error.status === 401) {
                    console.log("REMOVE");
                    ipcRenderer.send(REMOVE_DATA_FROM_STORAGE, "spotify_token");
                }
            }
        })
    }
    return (
        <div>
            <Button startIcon={<ArrowBackIcon />} size="large" onClick={() => onClickBack()}>
                Retour
            </Button>
            <div className="finderList-folderNameContainer">
                <div>
                    <QueueMusicIcon className="finderList-folderIcon"></QueueMusicIcon>
                </div>
                <div className="finderList-folderInfoContainer">
                    <p>Playlist Spotify</p>
                    <h1 style={{ fontSize: "3rem" }}>{playlistName}</h1>
                    <Button variant="contained" style={{ width: "80px", textTransform: "none", backgroundColor: "var(--primary)" }}>Lecture</Button>
                </div>
            </div>
            {playlistSongs && (
                <div className="finderListItem">
                    <ul>
                        {playlistSongs.map(function (elem, index) {
                            return (
                                // <Fragment key={index}>
                                //   <ListItem className="finderListItem" onClick={() => clickOnSong(elem)}>
                                //     {elem}
                                //   </ListItem>
                                //   <Divider />
                                // </Fragment>
                                <li onClick={() => clickOnSong(elem.track.uri)}><span>{elem.track.artists[0].name} - {elem.track.name}</span></li>
                            )
                        })}
                    </ul>
                </div>
                // <List>
                //     {playlistSongs.map(function (elem, index) {
                //         return (
                //             <Fragment key={index}>
                //                 <ListItem className="finderListItem" onClick={() => clickOnSong(elem.track.uri)}>
                //                     {elem.track.artists[0].name} - {elem.track.name}
                //                 </ListItem>
                //                 <Divider />
                //             </Fragment>
                //         )
                //     })}
                // </List>
            )}
        </div>
    )
}

export default ListPlaylist;