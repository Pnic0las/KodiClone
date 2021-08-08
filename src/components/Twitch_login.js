import React, { useEffect, useState } from 'react';
import {
    FETCH_DATA_FROM_STORAGE,
    SAVE_DATA_IN_STORAGE,
    HANDLE_FETCH_DATA_FROM_STORAGE,
    HANDLE_SAVE_DATA_IN_STORAGE,
    HANDLE_TWITCH,
} from "../utils/constants";


const TwitchLogin = ({ token }) => {

    const { ipcRenderer } = window.require('electron')
    

    useEffect(() => {
        ipcRenderer.on(HANDLE_FETCH_DATA_FROM_STORAGE, handleFetchData);
        ipcRenderer.on(HANDLE_SAVE_DATA_IN_STORAGE, handleSaveData);

        ipcRenderer.send(FETCH_DATA_FROM_STORAGE, "Twitch_token");


        return function cleanup() {
            ipcRenderer.removeListener(HANDLE_FETCH_DATA_FROM_STORAGE, handleFetchData);
            ipcRenderer.removeListener(HANDLE_SAVE_DATA_IN_STORAGE, handleSaveData);
        };
    }, [])

    function handleFetchData(event, data) {
        const twitch_token = data.data.accesstoken;

        if (twitch_token)
            token(twitch_token);
        console.log(data)
    }

    function handleSaveData(event, data) {

        console.log(data)
        if (data.success === true && data.data.accesstoken) {
            token(data.data.accesstoken);
        }
    }


    const Test = () => {
        ipcRenderer.send(HANDLE_TWITCH)

    }

    return (
        <div>
            <button onClick={() => Test()}>
                CONNEXION
            </button>
        </div>
    )
}

export default TwitchLogin;