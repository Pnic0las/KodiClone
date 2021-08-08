import React, { useEffect, useState } from "react"
import {
  FETCH_DATA_FROM_STORAGE,
  SAVE_DATA_IN_STORAGE,
  HANDLE_FETCH_DATA_FROM_STORAGE,
  HANDLE_SAVE_DATA_IN_STORAGE,
  HANDLE_SPOTIFY_REQUEST,
  REMOVE_DATA_FROM_STORAGE
} from "../../utils/constants";

import "./Finder.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import FinderItem from "./FinderItem";
import FinderList from "./FinderList";
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import ProfileCard from "../ProfileCard";
import PlaylistFinder from "./PlaylistFinder";

const { ipcRenderer } = window.require('electron')
const { dialog } = window.require('electron').remote

function Finder() {
  const [paths, setPaths] = useState([]);
  const [files, setFiles] = useState([]);
  const [folderName, setfolderName] = useState("");
  const [fullPath, setFullPath] = useState("");
  const [spotifyData, setSpotifyData] = useState(undefined);
  const [spotifyUser, setSpotifyUser] = useState("");
  const [playlistData, setPlaylistData] = useState(undefined);

  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_DATA_FROM_STORAGE, handleFetchData);
    ipcRenderer.on(HANDLE_SAVE_DATA_IN_STORAGE, handleSaveData);
    ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "musicPaths");
    ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "spotify_token");

    return function cleanup() {
      ipcRenderer.removeListener(HANDLE_FETCH_DATA_FROM_STORAGE, handleFetchData);
      ipcRenderer.removeListener(HANDLE_SAVE_DATA_IN_STORAGE, handleSaveData);
    };
  }, [])

  useEffect(() => {
    console.log("spotifyData", spotifyData);
    if (spotifyData && spotifyData.accessToken && spotifyData.refreshToken) {
      axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me",
        headers: {
          "Authorization": "Bearer " + spotifyData.accessToken
        }
      }).then((response) => {
        console.log(response.data);
        setSpotifyUser({
          name: response.data.display_name,
          picture: response.data.images[0].url
        })
      }).catch((error) => {
        console.log(error.response);
        const err = error.response;
        console.log("ERRRR", err);
        if (err.data.error.status === 401) {
          console.log("REMOVE");
          ipcRenderer.send(REMOVE_DATA_FROM_STORAGE, "spotify_token");
        }
      })
    }
  }, [spotifyData])


  function openFolder() {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then((data) => {
      console.log("DATA", data);
      if (data.canceled === true) {
        console.log("Canceled");
        return;
      }
      const folder = data.filePaths[0];
      savePath(folder);
    });
  }

  function savePath(path) {
    var pathsContainer = paths;
    pathsContainer.push({ path: path });

    // setPaths(pathsContainer);
    ipcRenderer.send(SAVE_DATA_IN_STORAGE, {
      name: "musicPaths",
      data: {
        paths: pathsContainer
      }
    });
  }

  const handleFetchData = (event, data) => {
    const paths = data.data.paths;
    if (paths) {
      setPaths(paths);
      console.log("Handle Fetch Data PATHS", paths);
    } else if (data.data.access_token) {
      console.log("HANDLE FETCH DATA", data.data.access_token);
      setSpotifyData({
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token
      })
    }
  }

  const handleSaveData = (event, data) => {
    console.log("Handle Save Data", data);
    if (data.success === true && data.data.data !== undefined) {
      setPaths(data.data.data.paths);
    }
    if (data.success === true && data.message === "Saved token") {
      console.log(data.data.access_token);
      console.log(data.data.refresh_token);
      setSpotifyData({
        accessToken: data.data.access_token,
        refreshToken: data.data.refresh_token
      })
    }
  }

  const onClickItemHandler = (files, folderName, fullpath) => {
    setFullPath(fullpath);
    setFiles(files);
    setfolderName(folderName);
  }

  const onClickBackHandler = () => {
    setFiles([]);
  }

  const spotifyConnection = () => {
    ipcRenderer.send(HANDLE_SPOTIFY_REQUEST);
  }

  const getUserPlaylist = () => {
    console.log("PLAYLIST");
    axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/playlists",
      headers: {
        "Authorization": "Bearer " + spotifyData.accessToken
      }
    }).then((response) => {
      console.log("USER LAYLITT", response.data);
      setPlaylistData(response.data);
    }).catch((error) => {
      console.log(error.response);
      const err = error.response;
      console.log("ERRRR", err);
      if (err.data.error.status === 401) {
        console.log("REMOVE");
        ipcRenderer.send(REMOVE_DATA_FROM_STORAGE, "spotify_token");
      }
    })
  }

  return (
    <>
      {!paths.length && !files.length && !playlistData && (
        <div className="centerContainer">
          <h1>Vous n'avez pas encore importer de musique</h1>
          <Button variant="outlined" className="addFileButton bigMargin" onClick={() => openFolder()}>
            <FolderOutlinedIcon className="addFileIcon notOpen" />
            <FolderOpenOutlinedIcon className="addFileIcon open" />
            {/* <Icon icon="folder-o" className="addFileIcon notOpen" />
            <Icon icon="folder-open-o" className="addFileIcon open" /> */}
            Ajouter un dossier
          </Button>
        </div>
      )}
      {paths.length > 0 && !files.length && !playlistData && (
        <div className="musicFinderContainer">
          {spotifyData && (
            <ProfileCard name={spotifyUser.name} />
          )}
          <div className="centerContainer">
            <Grid container justify="center" spacing={3}>
              {paths.map(function (elem, index) {
                return (
                  <Grid key={index} item>
                    <FinderItem onClickItem={onClickItemHandler} path={elem.path}></FinderItem>
                  </Grid>
                )
              })}
            </Grid>
            <div className="finderMusicButton">
              <Button variant="contained" className="addFileButton bottomButton" style={{ marginTop: "5rem", backgroundColor: "var(--primary)" }} onClick={() => openFolder()}>
                <CreateNewFolderOutlinedIcon className="addFolder" />
            Ajouter un dossier
            </Button>
              {!spotifyData && (
                <Button variant="outlined" className="addFileButton bottomButton" style={{ marginTop: "5rem" }} onClick={() => spotifyConnection()}>
                  <svg height="120" viewBox="0 0 24 24" width="120" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" fill="#4caf50" r="12" /><g fill="#212121"><path d="m16.872 17.656v.001c-.203 0-.329-.063-.518-.174-3.019-1.82-6.532-1.896-10.002-1.185-.189.049-.436.126-.576.126-.47 0-.765-.373-.765-.765 0-.499.295-.736.659-.813 3.963-.875 8.013-.798 11.467 1.268.295.189.47.358.47.798 0 .438-.344.744-.735.744z" /><path d="m18.175 14.483h-.001c-.252 0-.421-.111-.596-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-.518 0-.938-.421-.938-.938s.252-.861.75-1.001c1.345-.378 2.719-.659 4.732-.659 3.14 0 6.174.779 8.565 2.202.392.232.547.533.547.953-.005.521-.411.943-.938.943z" /><path d="m4.548 6.998c1.703-.499 3.61-.735 5.686-.735 3.532 0 7.234.735 9.939 2.313.378.218.624.518.624 1.093 0 .658-.533 1.127-1.122 1.127l-.001-.001c-.252 0-.407-.063-.625-.189-3.444-2.056-9.605-2.549-13.591-1.436-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z" /></g></svg>
            Spotify
                </Button>
              )}
              {spotifyData && (
                <>
                  <Button variant="outlined" className="addFileButton bottomButton" style={{ marginTop: "5rem" }} onClick={() => getUserPlaylist()}>
                    <QueueMusicIcon className="addFileIcon" />
                  Playlist Spotify
                </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {files.length > 0 && !playlistData && (
        <FinderList onClickBack={onClickBackHandler} files={files} folderName={folderName} fullPath={fullPath}></FinderList>
      )}
      {playlistData && (
        <PlaylistFinder playlist={playlistData.items} spotifyToken={spotifyData.accessToken} />
      )}
    </>
  )
}

export default Finder