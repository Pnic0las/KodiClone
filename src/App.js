import React, { useState, useEffect } from 'react';
import './App.css';

import Book from './components/Book'
import Cine from './components/Cine';
import Menu from './components/Menu';
import ContentHandler from './components/ContentHandler';
import Image from './components/menu/Image';
import Home from './components/menu/Home';
// import Drawer from './components/Paint';
import Music from './components/menu/Music';
import Video from "./components/Video";
import Twitch from "./components/Twitch"

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import BurstModeIcon from '@material-ui/icons/BurstMode';
// import DuoIcon from '@material-ui/icons/Duo';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import VideocamIcon from '@material-ui/icons/Videocam';
import TwitchIcon from '../public/twitch-seeklogo.com.svg'
import MovieIcon from '@material-ui/icons/Movie';

import { Box } from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Player from './components/Player';

const menuArray = [
  {
    title: "Accueil",
    icon: "home",
    component: Home
  },
  {
    title: "Musique",
    icon: MusicNoteIcon,
    component: Music
  },
  {
    title: "Image",
    icon: BurstModeIcon,
    component: Image
  },
  {
    title: "eLib",
    icon: ImportContactsIcon,
    component: Book
  },
  {
    title: "Video",
    icon: VideocamIcon,
    component: Video
  },
  {
    title: "FilmSearch",
    icon: MovieIcon,
    component: Cine
  },
  {
    title: "Twitch",
    svg: "/2335367.png",
    component: Twitch
  }
]


function App() {
  const [activeKey, setActiveKey] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    console.log("IS DARK", isDark);
  }, [isDark])

  let theme = createMuiTheme({
    palette: {
      type: isDark ? "dark" : "light",
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <div className="fullpage">
        <Box className="navbar" boxShadow={7}>
          <Menu menu={menuArray} setActiveKey={setActiveKey} activeKey={activeKey} isDark={isDark} setIsDark={setIsDark}></Menu>
        </Box>
        <main style={menuContainer}>
          <ContentHandler menu={menuArray} activeKey={activeKey}></ContentHandler>
          <div className="player">
            <Player />
          </div>
        </main>
      </div>
    </ThemeProvider>

    // <div>

    //   <a
    //     href="#"
    //     onClick={e => {
    //       e.preventDefault();
    //       emptyCacheStorage();
    //     }}
    //   >
    //     Update version
    //       </a>

    // </div>
  );
}


const menuContainer = {
  display: "flex",
  height: "100%",
  position: "relative"
}

export default App;
