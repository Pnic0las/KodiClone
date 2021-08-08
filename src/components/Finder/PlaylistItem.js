import React from "react"

import "./Finder.css"
import { Button } from "@material-ui/core"

function FinderItem({ playlistName, onClickItem, icon, playlistID }) {
    const Icon = icon;
    return (
        <div>
            <Button variant="outlined" className="addFileButton" onClick={() => onClickItem(playlistID, playlistName)}>
                <Icon className="addFileIcon" />
                {playlistName}
            </Button>
        </div>
    )
}

export default FinderItem;