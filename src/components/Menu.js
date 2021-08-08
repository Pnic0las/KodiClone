import React from 'react';

// import { Sidenav, Nav, Icon, Toggle } from 'rsuite';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Brightness4Icon from '@material-ui/icons/Brightness4';

function Menu({ activeKey, setActiveKey, menu, isDark, setIsDark }) {

  function handleSelect(eventKey) {
    setActiveKey(eventKey);
  }

  function switchTheme() {
    console.log("SWITCH");
    const body = document.body;
    if (isDark === true) {
      body.classList.replace("dark", "light");
      setIsDark(false);
    }
    else {
      body.classList.replace("light", "dark");
      setIsDark(true);
    }
  }

  return (
    <ul className="navbar-nav">
      <li className={"logo " + (activeKey === 0 ? "active-logo" : "")}>
        <div onClick={() => handleSelect(0)} className="nav-link">
          <span className="link-text">Epikodi</span>
          <ArrowForwardIosIcon className="nav-icon" fontSize="large" />
        </div>
      </li>
      {menu.map(function (elem, index) {
        var SVG = null;
        if (index !== 0) {
          if (elem.svg !== 0) {
            SVG = elem.svg;
          }
          const Icon = elem.icon;
          return (
            <li key={index} className={"nav-item " + (activeKey === index ? 'active' : '')}>
              <div onClick={() => handleSelect(index)} className="nav-link">
                {!SVG && (
                  <Icon fontSize="large" className="nav-icon"></Icon>
                )}
                {SVG && (
                  <img src={SVG} style={{width:"39px", marginLeft:"20px"}}></img>
                )}
                <span className="link-text">{elem.title}</span>
              </div>
            </li>
          )
        }
        return (null)
      })}

      <li className="nav-item">
        <div className="nav-link" onClick={() => switchTheme()}>
          <Brightness4Icon fontSize="large" className="nav-icon"></Brightness4Icon>
          <span className="link-text">Thème</span>
        </div>
      </li>
    </ul>
  );
}

export default Menu;