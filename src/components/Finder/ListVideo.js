import React, { useState, useEffect, Fragment } from "react"
import { Button, List, ListItem, Divider } from "@material-ui/core"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import VideoPlayer from "../VideoPlayer"

import FolderIcon from '@material-ui/icons/Folder';


const fs = window.require("fs");
var path = require('path');

function ListVideo({ files, onClickBack, folderName, fullPath }) {
  const [videoPath, setvideoPath] = useState();
  const [onlyMP3, setOnlyMP3] = useState([]);


  const clickOnSong = (name) => {
    const song = fullPath + "/" + name;
    console.log("IN SONG OMG", song);
    setvideoPath(song);
  }

  useEffect(() => {
    console.log("FILES OK", files);
    var onlyMP3 = files.filter(function (file) {
      return file.indexOf(".mp4") !== -1;
    })
    setOnlyMP3(onlyMP3);
  }, [files])

  return (
    <div>
      {!videoPath && (
        <>
          <Button startIcon={<ArrowBackIcon />} size="large" onClick={() => onClickBack()}>
            Retour
        </Button>
          <div className="finderList-folderNameContainer">
            <div>
              <FolderIcon className="finderList-folderIcon"></FolderIcon>
            </div>
            <div className="finderList-folderInfoContainer">
              <p>Dossier</p>
              <h1 style={{ fontSize: "3rem" }}>{folderName}</h1>
              <Button variant="contained" style={{ width: "80px", textTransform: "none", backgroundColor: "var(--primary)" }}>Lecture</Button>
            </div>
          </div>
          <List>
            {onlyMP3.map(function (elem, index) {
              return (
                <Fragment key={index}>
                  <ListItem className="finderListItem" onClick={() => clickOnSong(elem)}>
                    {elem}
                  </ListItem>
                  <Divider />
                </Fragment>
              )
            })}
          </List>
        </>
      )}
      {videoPath && (
        <VideoPlayer videoPath={videoPath} />
      )}

    </div>
  )
}

export default ListVideo;