import React, { useState } from "react"
import { Grid } from "@material-ui/core";

import PlaylistItem from "./PlaylistItem"
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ListPlaylist from "./ListPlaylist";

function PlaylistFinder({ playlist, spotifyToken }) {
    const [clickedPlaylist, setClickedPlaylist] = useState(undefined);

    const onClickItemHandler = (playlistID, playlistName) => {
        console.log("CLICK SPOTIFY PLAYLIST", playlistID);
        setClickedPlaylist({
            id: playlistID,
            name: playlistName
        });
    }

    const onClickBack = () => {
        console.log("OKAY ABCK");
        setClickedPlaylist(null);
    }
    return (
        <div className="fullpage">
            {!clickedPlaylist && (
                <div className="centerContainer">
                    <Grid container justify="center" spacing={3}>
                        {playlist.map(function (elem, index) {
                            return (
                                <Grid key={index} item>
                                    <PlaylistItem onClickItem={onClickItemHandler} playlistName={elem.name} playlistID={elem.id} icon={LibraryMusicIcon}></PlaylistItem>
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            )}
            {clickedPlaylist && (
                <ListPlaylist spotifyToken={spotifyToken} playlistID={clickedPlaylist.id} playlistName={clickedPlaylist.name} onClickBack={onClickBack} />
            )}
        </div>
    )
}

export default PlaylistFinder;