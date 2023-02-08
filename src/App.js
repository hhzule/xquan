/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./css/App.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

import Main from "./Pages/Home";

import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider);

function App() {

  const [_address, setAddress] = useState("0");

    const [isWalletConnected, setisWalletConnected] = useState(false);


  const CHAIN_ID = "1337";
  //const CHAIN_ID = "97";
  const CHAIN_ID1 = "0x61";

  // const CHAIN_ID = "97";
  // const CHAIN_ID1 = "0x61";

  async function connectWallet() {
    if (!window.ethereum) {
      alert(
        "it looks like that you dont have metamask installed,please install"
      );
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      // setNetworkID(networkId);
      console.log(
        "id from async func is: " + CHAIN_ID + "hellggg " + networkId.toString()
      );

      // console.log(IDs)
      if (networkId == CHAIN_ID) {
        setisWalletConnected(true);
        console.log("its in net" + isWalletConnected);

        setAddress(window.ethereum.selectedAddress);
        // mount1();
        // return accounts[0].toString();
      } else {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID1 }],
        });
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  }




  return (
    <div className="App">
      <Header connectWallet={connectWallet} isWalletConnected={isWalletConnected} _address={_address}/>
      <Routes>
        <Route path="/" element={<Main isWalletConnected={isWalletConnected} />} exact />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;


