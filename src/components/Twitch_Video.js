import React , {useEffect} from 'react';
import ReactPlayer from 'react-player';
import { Paper } from '@material-ui/core';

const style = {
    padding: 10,
    margin: 10,
    height: "100%",
    width: "100%"
};

export default function Twitch_Videos({ stream_url, bool }) {

    const Test = () => {
        bool(2)
    }

    useEffect(() => {
        console.log("je suis dans twitch video",stream_url)
    }, [])

    return (
        <>
            <Paper style={style} elevation={1}>
                <ReactPlayer
                    
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={stream_url}
                    controls={true}
                    loop={true}
                />
            </Paper>
            <button onClick={() => Test()}> Back TO Previous</button>
        </>
    );
    
}