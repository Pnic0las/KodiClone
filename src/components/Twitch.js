import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    FETCH_DATA_FROM_STORAGE,
    SAVE_DATA_IN_STORAGE,
    HANDLE_FETCH_DATA_FROM_STORAGE,
    HANDLE_SAVE_DATA_IN_STORAGE,
    HANDLE_TWITCH,
} from "../utils/constants";
import { func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Twitch_Display from './Twich_Display'
import Twitch_Login from './Twitch_login'
import Twitch_Video from './Twitch_Video'


function Twitch() {

    const [twitch_token, setTwitch_token] = useState()
    const client_id = 'xi9il1cckitjsxwcbbh1dlcoz9fm81'
    const [tabsValue, setTabsValue] = React.useState([]);
    const [tabsGame, setTabsGame] = React.useState([]);
    var userInfo;
    var Topgames;
    // const { ipcRenderer } = window.require('electron')
    const [bool, setbool] = useState(2);
    const [url, seturl] = useState('/video/melee.mp4')

    const useStyles = makeStyles((theme) => ({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }));

    const classes = useStyles();
    var categories;
    var id;

    function getValueGame(value) {
        categories = value
        console.log(categories)
    }

    function SearchGame() {
        console.log(categories)
        id = 0
        tabsGame.forEach(function (element){
            if (categories === element.game_name) {
                id = (element.id)
                
            }
        });
        var TwitchArray =[]
        var url = "https://api.twitch.tv/helix/streams?game_id=" + id
        axios({
            method: "GET",
            url: url,
            headers: {
                'Client-ID': client_id,
                'Authorization': "Bearer " + twitch_token,
            }

        })
            .then(response => {
                userInfo = response.data;
                console.log("channel name =", userInfo);
                response.data.data.forEach(function (item) {
                    var InfosTwitch = {};
                    InfosTwitch["user_name"] = item.user_name;
                    InfosTwitch["title"] = item.title;
                    InfosTwitch["viewer"] = item.viewer_count;
                    InfosTwitch["image_preview"] = (item.thumbnail_url.replace('{width}x{height}', '425x425'));

                    TwitchArray.push(InfosTwitch);

                })
                setTabsValue(TwitchArray)
            })
        
    }

    useEffect(() => {
        // ipcRenderer.send(HANDLE_TWITCH)
        console.log(twitch_token)
        var TwitchArray = [];
        var TheTopGames = [];
        axios({
            method: "GET",
            url: 'https://api.twitch.tv/helix/streams?language=fr',
            headers: {
                'Client-ID': client_id,
                'Authorization': "Bearer " + twitch_token,
            }

        })
            .then(response => {
                userInfo = response.data;
                console.log("channel name =", userInfo);
                response.data.data.forEach(function (item) {
                    var InfosTwitch = {};
                    InfosTwitch["user_name"] = item.user_name;
                    InfosTwitch["title"] = item.title;
                    InfosTwitch["viewer"] = item.viewer_count;
                    InfosTwitch["image_preview"] = (item.thumbnail_url.replace('{width}x{height}', '425x425'));

                    TwitchArray.push(InfosTwitch);

                })
                setTabsValue(TwitchArray)
            })
        axios({
            method: "GET",
            url: 'https://api.twitch.tv/helix/games/top',
            headers: {
                'Client-ID': client_id,
                'Authorization': "Bearer " + twitch_token
            }
        })
            .then(response => {
                Topgames = response.data;
                console.log(Topgames)
                response.data.data.forEach(function (item) {
                    var InfosGame = {};
                    InfosGame["game_name"] = item.name;
                    InfosGame["image"] = (item.box_art_url.replace('{width}x{height}', '170x170'));
                    InfosGame["id"] = item.id;

                    TheTopGames.push(InfosGame);
                })
                setTabsGame(TheTopGames)
            })

            }, [twitch_token])



    return (
        <>
            {!twitch_token && (
                <Twitch_Login token={setTwitch_token}></Twitch_Login>
            )}
            {bool === 2 && twitch_token && (
                <>
                    <Paper>
                    <Autocomplete
                        options={tabsGame}
                        getOptionLabel={(option) => option.game_name}
                        style={{ width: 300 }}
                        onClose={(e) => console.log("le zafer", e.target.value)}
                        renderInput={(params) => <TextField {...params} label="Search Game" variant="outlined" onChange={(e) => getValueGame(e.target.value) }/>}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={() => SearchGame()}>
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                    {/* <Paper>
                        <InputBase
                            className={classes.input}
                            placeholder="Search a Game"
                            inputProps={{ 'aria-label': 'search a game' }}
                            onChange={(e) => getValueGame(e.target.value)}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={() => SearchGame()}>
                            <SearchIcon />
                        </IconButton>
                    </Paper> */}
                    <Grid container justify="center" spacing={4}>
                        <>
                            {
                                tabsValue.map(function (item, index) {
                                    return (
                                        <Grid key={index} item>
                                            <Twitch_Display Newsdata={item} bool={setbool} url={seturl} />
                                        </Grid>
                                    )
                                })
                            }
                        </>
                    </Grid>
                </>
            )}
            {bool === 3 && (
                <>
                    <Twitch_Video stream_url={url} bool={setbool}></Twitch_Video>
                </>
            )}
        </>
    )
}




export default Twitch;