import React, { useEffect, useState } from "react"
import {
  FETCH_DATA_FROM_STORAGE,
  SAVE_DATA_IN_STORAGE,
  HANDLE_FETCH_DATA_FROM_STORAGE,
  HANDLE_SAVE_DATA_IN_STORAGE
} from "../../utils/constants";
import "./Finder.css";

import { Button } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';

import FinderItem from "./FinderItem";
import ListVideo from "./ListVideo";
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';

const { ipcRenderer } = window.require('electron')
const { dialog } = window.require('electron').remote

const FinderImage = () => {
  const [paths, setPaths] = useState([]);
  const [files, setFiles] = useState([]);
  const [folderName, setfolderName] = useState("");
  const [fullPath, setFullPath] = useState("");

  useEffect(() => {
    ipcRenderer.on(HANDLE_FETCH_DATA_FROM_STORAGE, handleFetchData);
    ipcRenderer.on(HANDLE_SAVE_DATA_IN_STORAGE, handleSaveData);

    ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "videoPaths");

    return function cleanup() {
      ipcRenderer.removeListener(HANDLE_FETCH_DATA_FROM_STORAGE, handleFetchData);
      ipcRenderer.removeListener(HANDLE_SAVE_DATA_IN_STORAGE, handleSaveData);
    };
  }, [])

  useEffect(() => {
    console.log("ACTUAL PATH", paths);
  }, [paths])


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
      name: "videoPaths",
      data: {
        paths: pathsContainer
      }
    });
  }

  const handleFetchData = (event, data) => {
    const paths = data.data.paths;
    if (paths) {
      setPaths(paths);
    }
    console.log("Handle Fetch Data", paths);
  }

  const handleSaveData = (event, data) => {
    console.log("Handle Save Data", data);
    if (data.success === true && data.data.data.paths) {
      setPaths(data.data.data.paths);
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

  return (
    <>
      {!paths.length && !files.length && (
        <div className="centerContainer">
          <h1>Vous n'avez pas encore importer de vidéo</h1>
          <Button variant="outlined" className="addFileButton bigMargin" onClick={() => openFolder()}>
            <FolderOutlinedIcon className="addFileIcon notOpen"/>
            <FolderOpenOutlinedIcon  className="addFileIcon open"/>
            Ajouter un dossier
          </Button>
        </div>
      )}
      {paths.length > 0 && !files.length && (
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
          <div>
            <Button variant="contained" className="addFileButton" style={{marginTop: "5rem", backgroundColor: "var(--primary)"}} onClick={() => openFolder()}>
            <CreateNewFolderOutlinedIcon className="addFolder"/>
            Ajouter un dossier
            </Button>
          </div>
        </div>
      )}
      {files.length > 0 && (
        <ListVideo onClickBack={onClickBackHandler} files={files} folderName={folderName} fullPath={fullPath}></ListVideo>
      )}
    </>
  )
}

export default FinderImage