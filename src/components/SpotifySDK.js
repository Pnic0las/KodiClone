import React, { useEffect } from 'react';
import Script from 'react-load-script'
import SpotifyPlayer from "react-spotify-web-playback";
const SpotifySDK = ({ accessToken }) => {

    useEffect(() => {
        // window.onSpotifyWebPlaybackSDKReady = () => {
        //     console.log("OK onSpotifyWebPlaybackSDKReady");
        //     handleLoadSuccess();
        // }
        console.log("OK AAYA ", accessToken)
    }, [accessToken]);

    const handleLoadSuccess = () => {
        console.log("Script loaded");
        const token = accessToken;
        const player = new window.Spotify.Player({
            name: 'Web Playback SDK Quick Start Player',
            getOAuthToken: cb => { getToken(token) }
        });
        console.log("PLAYER ", player);

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error("initialization_error", message); });
        player.addListener('authentication_error', ({ message }) => { console.error("authentication_error", message); });
        player.addListener('account_error', ({ message }) => { console.error("account_error", message); });
        player.addListener('playback_error', ({ message }) => { console.error("playback_error", message); });

        // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.connect();
    }

    const getToken = (token) => {
        return (token);
    }

    const handleScriptCreate = () => {
        console.log("Script created");
    }

    const handleScriptError = () => {
        console.log("Script error");
    }

    const handleScriptLoad = () => {
        console.log("Script loaded");
    }

    return (
        // <Script
        //     url="https://sdk.scdn.co/spotify-player.js"
        //     onCreate={handleScriptCreate}
        //     onError={handleScriptError}
        //     onLoad={handleScriptLoad}
        // />
        <SpotifyPlayer
            token={accessToken}
            uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
        />
    );
}

export default SpotifySDK;