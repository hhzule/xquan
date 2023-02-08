import ethlogo from '../Img/ethereum.png'
import bnblogo from '../Img/binance.png'
import polylogo from '../Img/polygon.png'

const chainInfo = {
    "1337" : {
        name : "LocalHost",
        logo : ethlogo,
    },
    "97" : {
        name : "Binance Testnet",
        logo : bnblogo
    },
    "421613" :{
        name : "arbitrum goerli",
        logo : ethlogo
    } 
}
export default chainInfo