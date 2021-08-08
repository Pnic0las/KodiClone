import React from "react"

import "./Finder.css"
import { Button } from "@material-ui/core"
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
// import { makeStyles } from "@material-ui/styles"

const fs = window.require("fs");

function FinderItem({ path, onClickItem }) {
    var n = path.lastIndexOf('/');
    var lastPath = path.substring(n + 1);
    // const classes = useStyles();

    const readFolder = (path) => {
        fs.readdir(path, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            const fileArray = [];
            files.forEach(function (file) {
                fileArray.push(file);
            });
            onClickItem(fileArray, lastPath, path);
        });
    };

    return (
        <div>
            <Button variant="outlined" className="addFileButton" onClick={() => readFolder(path)}>
                <FolderOutlinedIcon className="addFileIcon notOpen" />
                <FolderOpenOutlinedIcon className="addFileIcon open" />
                {lastPath}
            </Button>
        </div>
    )
}

export default FinderItem;