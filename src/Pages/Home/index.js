import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Link } from "react-router-dom";
import Select from "react-select";
import { DropDownIcon } from "../../icons";
import Web3 from "web3";
import SALEABI from '../../contract/ABIs/PackageSale.json'

import {
  InvestABI_3,
  InvestAddress3,
  stakeToken_address3,
  tokenAbI_3,
} from "../../config";
import calls from "../../services/calls";
import { address_one } from "../../contract/one";

const Main = (props) => {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [selectedAmount, set_selectedAmount] = useState("");

  const [MonthlyPurchaseIds, set_MonthlyPurchaseIds] = useState([]);
  const [quarterlyPurchaseIds, set_quarterlyPurchaseIds] = useState([]);

  const [MonthlyPurchaseInfo, set_MonthlyPurchaseInfo] = useState([]);
  const [quarterlyPurchaseInfo, set_quarterlyPurchaseInfo] = useState([]);

  const [totalReturn, set_totalReturn] = useState("");
  const [totalDeposit, set_totalDeposit] = useState("");

  const [activeTab3, setActiveTab3] = useState("stake");

  const [balance1, setBalance1] = useState(0);
  const [balance2, setBalance2] = useState(0);

  const [_address, setAddress] = useState(null);
  const [isWalletConnected, setisWalletConnected] = useState(false);
  const [referral, setReferral] = useState("0");

  const [plan1_allInvestments3, set_plan1_investmentList3] = useState([]);
  const [plan2_allInvestments3, set_plan2_investmentList3] = useState([]);
  const [plan3_allInvestments3, set_plan3_investmentList3] = useState([]);

  const [investment3, setInvestment3] = useState(false);

  const [selectedPackage3, setSelectedPackage3] = useState({
    display: "GAMEZONE ALPHA I",
    value: "250$",
  });

  const [selectedPackageWd3, setSelectedPackageWd3] = useState({
    display: "PAKAGES",
    value: "null1",
  });

  console.log("what selectedPackageWd3...", selectedPackageWd3);

  const [selectedPackageUnVal31, setSelectedPackageUnVal31] = useState({
    inv: "",
    num: "",
    timeLeft: "",
    reward: "",
  });

  const [selectedPackageUnVal32, setSelectedPackageUnVal32] = useState({
    inv: "",
    num: "",
    timeLeft: "",
    reward: "",
  });

  const [selectedPackageUnVal33, setSelectedPackageUnVal33] = useState({
    inv: "",
    num: "",
    timeLeft: "",
    reward: "",
  });

  const creditPackageList = [
    {
      display: "GAMEZONE ALPHA I",
      value: "250$",
    },
    {
      display: "GAMEZONE ALPHA II",
      value: "500$",
    },
  ];

  const creditPackageListWd = [
    {
      display: "MONTHLY PACKAGE/S",
      value: "0",
    },
    {
      display: "QUARTERLY PACKAGE/S",
      value: "1",
    },
  ];

  useEffect(() => {
    document.addEventListener("click", () => {
      setHide(false);
    });
    if (props.isWalletConnected) {
      mount3();
    }
  }, [props.isWalletConnected]);

  const CHAIN_ID1 = "0x61";

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("ref");

  const count = (_deadline) => {
    console.log("here is deadine " + _deadline);
    var now = new Date().getTime();
    _deadline = Number(_deadline) * 1000;
    var t;
    if (Number(now) < Number(_deadline)) {
      t = Number(_deadline) - Number(now);
      console.log(" its count " + _deadline + "   " + now + "   " + t);
      // console.log(deadline)
      var dd = Math.floor(t / (1000 * 60 * 60 * 24));
      var hh = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mm = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      var ss = Math.floor((t % (1000 * 60)) / 1000);

      var days = dd < 10 ? "0" + dd : dd;
      var hours = hh < 10 ? "0" + hh : hh;
      var minutes = mm < 10 ? "0" + mm : mm;
      var seconds = ss < 10 ? "0" + ss : ss;

      //  setState({ days, minutes, hours, seconds });
      console.log("innu8ni " + days);

      // if (t < 0) {
      //   setState({
      //     days: 0,
      //     minutes: 0,
      //     hours: 0,
      //     seconds: 0,
      //     time_up: "TIME IS UP",
      //   });

      //   // clearInterval(x);
      //   // var today = new Date();
      //   // today.setDate(today.getDate(Date) + 2);
      //   // deadline = today.getTime(Date);
      //   // return
      // }
      if (days > 0) {
        return Number(days) + 1 + " days";
      } else if (hours > 0) {
        return Number(hours) + 1 + " hours";
      } else if (minutes > 0) {
        return Number(minutes) + 1 + " minutes";
      } else {
        return Number(seconds) + 1 + " seconds";
      }
    } else {
      return "0";
    }
  };

  function set_planAmount(val) {
    if (selectedPackage3.value == "250$") {
      set_selectedAmount(250);
    } else if (selectedPackage3.value == "500$") {
      set_selectedAmount(500);
    }
  }

  async function mount3() {
    try {
      console.log("hello mount");
      // Get network provider and web3 instance.
      const web3 = new Web3(window.ethereum);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const tokenContract = tokenContractAddress;
      //const investContract = InvestAddress;s

      const contract = new web3.eth.Contract(InvestABI_3, InvestAddress3);

      // let data = await contract.methods.plan1(accounts[0]).call({ from: accounts[0].toString() });
      let _userMonthlyPurchaseIds = await calls.get_userMonthlyPurchaseIds(accounts[0])

      set_MonthlyPurchaseIds(_userMonthlyPurchaseIds);
      // console.log("_userMonthlyPurchaseIds" , _userMonthlyPurchaseIds)
      let _userQuarterlyPurchaseIds = await contract.methods
        .monthlyPurchasesOf(accounts[0])
        .call();
        

      let MonthlyPurchaseInformation = await contract.methods
        .quarterlyPurchasesOf(accounts[0])
        .call();

      let QuarterlyPurchaseInformation = await contract.methods
        .getQuarterlyPurchaseInformation(2)
        .call({ from: accounts[0].toString() });
      console.log("hello mount332");

      console.log("hello mount333");

      // console.log("its inv "+plan1_array[0].num);
      console.log(tokenAbI_3, stakeToken_address3)
      const contract1 = new web3.eth.Contract(tokenAbI_3, stakeToken_address3);

      let balance1 = await calls.get_BUSDbalance(accounts[0])
      console.log("edsf " + balance1);

      // balance = balance/10**8;
      balance1 = web3.utils.fromWei(balance1, "ether");

      setBalance1(parseFloat(balance1).toFixed(2));
      setBalance2(parseFloat(balance2).toFixed(2));

      set_MonthlyPurchaseIds(_userMonthlyPurchaseIds);
      set_quarterlyPurchaseIds(_userQuarterlyPurchaseIds);

      set_MonthlyPurchaseInfo(MonthlyPurchaseInformation);
      set_quarterlyPurchaseInfo(QuarterlyPurchaseInformation);


      setisWalletConnected(true);
      setAddress(window.ethereum.selectedAddress);

      if (id != null) {
        setReferral(id);
        console.log("its id " + id);
      }

      // set_total_withdraw_reward(parseFloat(total_withdraw_reward).toFixed(2));
    } catch (error) {
      console.error(error);
    }
  }

  async function stake3() {
    if (!props.isWalletConnected) {
      alert("kindly connect your wallet");
      return;
    }

    try {
      let web3;
      const noReferral = "0x0000000000000000000000000000000000000000";

      // Get network provider and web3 instance.
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        const id = await window.ethereum.request({ method: "eth_chainId" });
        console.log(
          "id from async func is: " + CHAIN_ID1 + "hello" + typeof id
        );
        // if (CHAIN_ID1 != id) {
        //   console.log("done");
        //   alert("please change your network to binance smart chain");
        //   return;
        // }
      } else {
        alert(
          "its look like you dont have metmask extension installed in you browser"
        );
        return;
      }

      let pack;

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const contractStake = new web3.eth.Contract(
        tokenAbI_3,
        stakeToken_address3
      );
      console.log("object usdt");

      const contract = new web3.eth.Contract(InvestABI_3, address_one.PackageSale);

      if (referral == "0") {
        console.log("without referral " + noReferral);
        if (selectedPackage3.value == "250$") {
          pack = 0;

          if (Number(balance1) < 250) {
            alert("you dont have enough balance to invest");
            return;
          }

          let temp = web3.utils.toWei("250", "ether");
          console.log(temp);
          let balance = await calls.approve_busd(250)
          if (selectedPayoutType == "Payout1") {
            const result = await calls.purchaseMonthlyPackage(pack,noReferral)
              
            if (result) {
              alert("Your investment is successfully done");
              mount3();
            }
          }
          if (selectedPayoutType == "Payout3") {
            const result = await contract.methods
              .purchaseQuarterlyPackage(pack.toString(), noReferral)
              .send({ from: accounts[0] });
            if (result) {
              alert("Your investment is successfully done");
              mount3();
            }
          }
        } else if (selectedPackage3.value == "500$") {
          pack = 1;
          if (Number(balance1) < 500) {
            alert("you dont have enough balance to invest");
            return;
          }

          let temp = web3.utils.toWei("500", "ether");
          console.log(temp);
          let balance = await calls.approve_busd(500)
          if (selectedPayoutType == "Payout1") {
            const result = pack.toString()
            if (result) {
              alert("Your investment is successfully done");
              mount3();
            }
          }
          if (selectedPayoutType == "Payout3") {
            const result = await contract.methods
              .purchaseQuarterlyPackage(pack.toString(), noReferral)
              .send({ from: accounts[0] });
            if (result) {
              alert("Your investment is successfully done");
              mount3();
            }
          }
        }
      } else {
        console.log("with referral " + referral);

        if (selectedPackage3.value == "250$") {
          pack = 0;
          if (Number(balance1) < 250) {
            alert("you dont have enough balance to invest");
            return;
          }
          let temp = web3.utils.toWei("250", "ether");
          console.log(temp);
          let balance = await calls.approve_busd(250)
          if (selectedPayoutType == "Payout1") {
            console.log("payout1 with ref");
            const result = await contract.methods
              .purchaseMonthlyPackage(pack, referral)
              .send({ from: accounts[0] });
            if (result) {
              alert("Your investment is successfully done");
              mount3();
            }
          }
          if (selectedPayoutType == "Payout3") {
            const result = await contract.methods
              .purchaseQuarterlyPackage(pack.toString(), referral)
              .send({ from: accounts[0] });
            if (result) {
              alert("Your investment is successfully done");
              mount3();
            }
          }
        } else if (selectedPackage3.value == "500$") {
          pack = 1;
          if (Number(balance1) < 500) {
            alert("you dont have enough balance to invest");
            return;
          }
          let temp = web3.utils.toWei("500", "ether");
          console.log(temp);
          let balance = await calls.approve_busd(500)
          if (selectedPayoutType == "Payout1") {
            const result = await contract.methods
              .purchaseMonthlyPackage(pack.toString(), referral)
              .send({ from: accounts[0] });
            if (result) {
              alert("Your investment is successfully done");
              mount3();
            }
          }
          if (selectedPayoutType == "Payout3") {
            const result = await contract.methods
              .purchaseQuarterlyPackage(pack.toString(), referral)
              .send({ from: accounts[0] });
            if (result) {
              alert("Your investment is successfully done");
              mount3();
            }
          }
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }
  try {
    // window.ethereum.on("chainChanged", hello);
    // window.ethereum.on("accountsChanged", hello);
  } catch {}

  let timerId = setInterval(function () {
    if (props.isWalletConnected) {
      // mount1();
      // mount2();
      // mount3();
      console.log("hihklnohh jipjio ioohj ");
      // clearInterval(timerId);
    }
  }, 50000);

  const [selectedType, setSelectedType] = useState("BUSD");
  const [selectedPayoutType, setSelectedPayoutType] = useState("Payout1");

  return (
    <div>
      <div className="home-page flex flex-col">
        <div className="wrap wrapWidth flex justify-center flex-col items-center">
          <div className="_block flex flex-col">
            <div className="card flex flex-col items-center">
              <div className="card-tag">Xquantum GameZone</div>
              <div className="card-block flex-col items-center">
                <div className="selection-tabs flex items-center">
                  <div
                    className={`tab flex items-center justify-center ${
                      activeTab3 == "stake" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      setActiveTab3("stake");
                    }}
                  >
                    Stake
                  </div>
                  <div
                    className={`tab flex items-center justify-center ${
                      activeTab3 == "withdraw" ? "active" : ""
                    }`}
                    onClick={(e) => {
                      setActiveTab3("withdraw");
                    }}
                  >
                    Reward
                  </div>
                </div>
                {activeTab3 === "stake" ? (
                  <div className="meta flex flex-col justify-between">
                    <div className="fields-box flex flex-col">
                      <div className="row-item flex items-start mb-6">
                        {/* <div className="item flex items-center mr-6">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedType("USDT");
                            }}
                            className={`cleanbtn radio-btn rel ${
                              selectedType === "USDT" ? "on" : ""
                            }`}
                          />
                          <div className="toggle-desc ml-2 cfff b6">USDT</div>
                        </div> */}
                        {/* <div className="item flex items-center">
                          <button
                            onClick={(e) => {
                              setSelectedType("BUSD");
                            }}
                            className={`cleanbtn radio-btn rel ${
                              selectedType === "BUSD" ? "on" : ""
                            }`}
                          />
                          <div className="toggle-desc ml-2 cfff b6">BUSD</div>
                        </div> */}
                      </div>
                      <div className="field flex flex-col">
                        <div className="f-tag">Select Package</div>
                        <Select
                          defaultValue={selectedPackage3}
                          value={selectedPackage3}
                          onChange={setSelectedPackage3}
                          getOptionLabel={(option) => option.display}
                          getOptionValue={(option) => option.value}
                          options={creditPackageList}
                          name="type"
                          className="select w-full"
                          placeholder="Type"
                        />
                        <div className="input-box flex items-center">
                          <input
                            type="text"
                            value={selectedPackage3.value}
                            className="txt w-full"
                            placeholder="1$ - 500$"
                          />
                        </div>
                      </div>

                      <div className="row-item flex items-start mb-6">
                        <div
                          className="item flex items-center mr-6 cursor-pointer"
                          onClick={(e) => {
                            setSelectedPayoutType("Payout1");
                          }}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPayoutType("Payout1");
                            }}
                            className={`cleanbtn radio-btn rel ${
                              selectedPayoutType === "Payout1" ? "on" : ""
                            }`}
                          />
                          <div className="toggle-desc ml-2 cfff b6">
                            Payout 1 Month
                          </div>
                        </div>
                        <div
                          className="item flex items-center cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPayoutType("Payout3");
                          }}
                        >
                          <button
                            onClick={(e) => {
                              setSelectedPayoutType("Payout3");
                            }}
                            className={`cleanbtn radio-btn rel ${
                              selectedPayoutType === "Payout3" ? "on" : ""
                            }`}
                          />
                          <div className="toggle-desc ml-2 cfff b6">
                            Payout 3 Month
                          </div>
                        </div>
                      </div>
                      <div className="item flex items-center justify-between">
                        <div className="lbl">ROI</div>
                        <div className="val">
                          {selectedPayoutType === "Payout1"
                            ? "5%"
                            : selectedPayoutType === "Payout3"
                            ? "25%"
                            : ""}
                        </div>
                      </div>
                      <div className="item flex items-center justify-between">
                        <div className="lbl">TIME</div>
                        <div className="val">365 Days</div>
                      </div>
                    </div>
                    <div className="action flex items-center justify-center">
                      <button className="btn button" onClick={stake3}>
                        STAKE
                      </button>
                    </div>
                  </div>
                ) : activeTab3 === "withdraw" ? (
                  <div className="meta flex flex-col">
                    <div className="field flex flex-col">
                      <div style={{paddingBottom:"3em"}} className="field flex flex-col">
                        <div className="f-tag"></div>
                        <Select
                          defaultValue={selectedPackageWd3}
                          value={selectedPackageWd3}
                          onChange={setSelectedPackageWd3}
                          getOptionLabel={(option) => option.display}
                          getOptionValue={(option) => option.value}
                          options={creditPackageListWd}
                          name="type"
                          classNamePrefix="select-drop-reward"
                          className="select w-full"
                          placeholder="Type"
                        />
                        <div></div>
                        <div></div>
                      </div>
                      {selectedPackageWd3.value == "0" ? (
                        <div className="field flex flex-col">
                          <div className="f-tag">Select Investment</div>
                          <Select
                            defaultValue={selectedPackageUnVal31}
                            value={selectedPackageUnVal32}
                            onChange={setSelectedPackageUnVal31}
                            getOptionLabel={(option) => option.inv / 10 ** 18}
                            getOptionValue={(option) => option.inv}
                            options={MonthlyPurchaseIds}
                            name="type"
                            className="select w-full"
                            placeholder=""
                          />

                          <div className="item flex items-center justify-between">
                            <div className="lbl">CLAIM REWARD AFTER:</div>
                            <div className="val">
                              {selectedPackageUnVal31.timeLeft == ""
                                ? " "
                                : selectedPackageUnVal31.timeLeft == "0"
                                ? ""
                                : count(selectedPackageUnVal31.timeLeft)}
                            </div>
                          </div>
                          <div className="item flex items-center justify-between">
                            <div className="lbl">TOTAL REWARD:</div>
                            <div className="val">
                              {Number(
                                selectedPackageUnVal31.reward / 10 ** 18
                              ).toFixed(2)}
                            </div>
                          </div>
                          <button className="btn button" onClick={stake3}>
                            CLAIM
                      </button>
                        </div>
                      ) : selectedPackageWd3.value == "1" ? (
                        <div className="field flex flex-col">
                          <div className="f-tag">Select Investment</div>
                          <Select
                            defaultValue={selectedPackageUnVal32}
                            value={selectedPackageUnVal32}
                            onChange={setSelectedPackageUnVal32}
                            getOptionLabel={(option) => option.inv / 10 ** 18}
                            getOptionValue={(option) => option.inv}
                            options={plan2_allInvestments3}
                            name="type"
                            className="select w-full"
                            placeholder=""
                          />

                          <div className="item flex items-center justify-between">
                            <div className="lbl">CLAIM REWARD AFTER:</div>
                            <div className="val">
                              {selectedPackageUnVal32.timeLeft == ""
                                ? " "
                                : selectedPackageUnVal32.timeLeft == "0"
                                ? ""
                                : count(selectedPackageUnVal32.timeLeft)}
                            </div>
                          </div>
                          <div className="item flex items-center justify-between">
                            <div className="lbl">TOTAL REWARD:</div>
                            <div className="val">
                              {Number(
                                selectedPackageUnVal32.reward / 10 ** 18
                              ).toFixed(2)}
                            </div>
                          </div>
                          <button className="btn button" onClick={stake3}>
                            CLAIM
                      </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="card2 flex flex-col items-center">
              <div className="card-block flex-col items-center">
                <div className="card-tag2">
                  10% commission for each referred buyer!
                </div>
                <div className="desc2">
                  Share the referral link and get 10% commission credited
                  directly to your wallet in$.
                  <br />
                  <br />
                  referral commission 10%
                </div>{" "}
                <br />
                {/* <div className="desc2">
                  Share your referral link or QR code and get commission for
                  referred token purchase instantly to your wallet.
                </div>{" "} */}
                <br />
                {!_address ? (
                  <div className="card-tag3">
                    Please connect your wallet first (Metamask)
                  </div>
                ) : (
                  /* <br /> */
                  <div className="card-tag3 overflow-hidden">
                    <p>https://buy.fuckgreatreset.io/?ref={_address}</p>
                  </div>
                )}
                <CopyToClipboard text={`fuk.netlify.com/?ref=${_address}`}>
                  <button className="btn-copy button">Copy</button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
