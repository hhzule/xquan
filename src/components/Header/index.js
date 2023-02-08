import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuIcon, TwitterIcon, DiscordIcon, SettingIcon } from "../../icons";

const Header = (props) => {
  useEffect(() => {}, [props._address]);
  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <Link to="/" className="logo">
            <img src="./images/logo.jpg" />
          </Link>
        </div>
        <div className="right flex items-center">
          <div className="action flex items-center">
            <div className="btn button" onClick={props.connectWallet}>
              {!props.isWalletConnected
                ? "Connect"
                : props._address.slice(0, 6)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
