import React, { useEffect, useState } from "react"
// import { Icon, IconButton, Button } from "rsuite"

import { Button } from "@material-ui/core"

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FolderIcon from '@material-ui/icons/Folder';

import ThumbnailSlider from "../Image/slider"

const fs = window.require("fs");

function FinderListImage({ files, onClickBack, folderName, fullPath }) {
  const [filesArray, setFilesArray] = useState([]);
  const [onlyImage, setOnlyImage] = useState([]);

  useEffect(() => {
    console.log("IN FINDERLIST IMAGE", files);

    var onlyImage = files.filter(function(file) {
      return (file.indexOf(".jpg") !== -1) || (files.indexOf(".png") !== -1)
    })
    setOnlyImage(onlyImage);
    
    
  }, [files]);
  
  useEffect(() => {
    const filesA = [];
    
    onlyImage.map(function (elem) {
      const fp = fullPath + "/" + elem
      const convertImage = fs.readFileSync(fp, "base64");
      
      var file = {
        name: elem,
        src: 'data:image/png;base64,' + convertImage
      };
      filesA.push(file);
      return file;
    });
    
    console.log("FILES ARRAY", filesA);
    setFilesArray(filesA)
  }, [onlyImage, fullPath])

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
        </div>
      </div>
      <ThumbnailSlider files={filesArray} />
    </div>
  )
}

export default FinderListImage