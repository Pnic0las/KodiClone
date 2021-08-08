import React, { useState, useEffect, Fragment } from "react"

import { Button, List, ListItem, Divider } from "@material-ui/core"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FolderIcon from '@material-ui/icons/Folder';

import { playerService } from "../playerService";

function FinderList({ files, onClickBack, folderName, fullPath }) {
  const [onlyMP3, setOnlyMP3] = useState([]);

  const clickOnSong = (name) => {
    const song = fullPath + "/" + name;
    console.log("IN SONG OMG", song);
    playerService.sendPath(song);
    // setSongPath(song);
  }

  useEffect(() => {
    console.log("FILES OK", files);
    var onlyMP3 = files.filter(function (file) {
      return file.indexOf(".mp3") !== -1;
    })
    setOnlyMP3(onlyMP3);
  }, [files])


  return (
    <div>
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
      <div className="finderListItem">
        {/* // <Fragment key={index}>
          //   <ListItem className="finderListItem" onClick={() => clickOnSong(elem)}>
          //     {elem}
          //   </ListItem>
          //   <Divider />
          // </Fragment> */}
        <ul>
          {onlyMP3.map(function (elem, index) {
            return (
              <li onClick={() => clickOnSong(elem)}><span>{elem}</span></li>
            )
          })}
        </ul>
      </div>
      {/* {songPath !== "" && (
        <div className={classes.player}>
          <Player path={songPath}></Player>
        </div>
      )} */}
    </div>
  )
}

// const useStyles = makeStyles(theme => ({
//   player: {
//     position: "fixed",
//     bottom: "0",
//     left: "6rem",
//     width: "95%"
//   }
// }))

export default FinderList