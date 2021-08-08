import React from 'react';
import ReactPlayer from 'react-player';
import {Paper} from '@material-ui/core';

const style = {
    padding: 10,
    margin: 10
};

export default class Videos extends React.Component {
    
    constructor(props) {
        super(props)
        console.log("video path", props.videoPath);
    }
    state = {
        url: "http://localhost:8000/file/?path=" + this.props.videoPath,
        pip: false,
        playing: true,
        controls: true,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: true
    }

    render() {

        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state

        return (
            <Paper style={style} elevation={1}>
                <ReactPlayer
                    ref={this.ref}
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={url}
                    controls={controls}
                    loop={loop}
                />

            </Paper>
        );
    }
}