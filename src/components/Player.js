import React, { useState, useEffect } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { playerService } from "./playerService"
import { Icon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const Player = () => {

  const [path, setPath] = useState();
  const [isSpotify, setIsSpotify] = useState(false);

  useEffect(() => {
    const subscription = playerService.onPath().subscribe(path => {
      if (path) {
        if (path === "spotify") {
          setPath(path)
          setIsSpotify(true);
        } else {
          console.log("IN SERVICE", path);
          setPath(path)
        }
      }
      else {
        setPath();
      }
    });
    return subscription.unsubscribe;
  }, [])

  const removePlayer = () => {
    setPath()
  }

  return (
    <>
      {path && !isSpotify && (
        <AudioPlayer
          autoPlay
          src={"http://localhost:8000/file/?path=" + path}
          onPlay={e => console.log("onPlay")}
          header={
            <>
              <div style={{ textAlign: "right" }}>
                <CloseIcon color="primary" style={{ cursor: "pointer" }} onClick={() => removePlayer()} />
              </div>
            </>
          }
        />
      )}
      {path && isSpotify && (
        <AudioPlayer
          autoPlay
          src={path}
          onPlay={e => console.log("onPlay")}
          header={
            <>
              <div style={{ textAlign: "right" }}>
                <CloseIcon color="primary" style={{ cursor: "pointer" }} onClick={() => removePlayer()} />
              </div>
            </>
          }
          customControlsSection={
            [
              <h1>This is an additional module in controls section </h1>,
              RHAP_UI.ADDITIONAL_CONTROLS,
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.VOLUME_CONTROLS,
            ]
          }
        // other props here
        />
      )}
    </>
  );
}

export default Player;