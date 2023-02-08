import SALEABI from "../contract/ABIs/PackageSale.json"
import BUSDABI from "../contract/ABIs/BUSD.json"
import { address_one } from "../contract/one"
import IERC20 from '../contract/ABIs/BUSD.json'
import {ethers} from 'ethers'
import Web3Modal from 'web3modal'
import ERROR from '../utils/error'

const createContractCalls = () => {

const loadProvider = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        return provider.getSigner();
    }
    catch (e) {
        console.log("loadProvider: ", e)
        
    }
  }




const get_userMonthlyPurchaseIds = async (account , library , chainId) => {
    try {
        console.log("monthlyPurchasesOf")
    let signer = await loadProvider()
    const contract = new ethers.Contract(address_one.PackageSale , SALEABI , signer)
    let monthlyPurchasesOf = await contract.monthlyPurchasesOf(account)
    console.log("monthlyPurchasesOf" , monthlyPurchasesOf) 
    return monthlyPurchasesOf
    } catch (error) {
        console.log("error monthlyPurchasesOf" , error)   
    return "SYM"
    
    }
}

const get_BUSDbalance = async (account , library , chainId) => {
    try {
    let signer = await loadProvider()
    const contract = new ethers.Contract(address_one.busd_addr, BUSDABI , signer)
    let BUSDbalance = await contract.balanceOf(account)
    console.log("BUSDbalance" , BUSDbalance.toString()) 
    return BUSDbalance.toString()
    } catch (error) {
        console.log("BUSDbalance" , error)   
    return "0xx"
    
    }
}

const approve_busd = async ( amount , chainId) => {
    try {
    let signer = await loadProvider()
    const contract = new ethers.Contract(address_one.busd_addr, BUSDABI , signer)
    let approve = await contract.approve(address_one.PackageSale , ethers.utils.parseEther(amount.toString()))
    approve = await approve.wait()
    console.log("approve" , approve) 
    return true
    } catch (error) {
        console.log("approve" , error)   
    return false
    
    }
}

const purchaseMonthlyPackage = async ( pack_type , refferal_account) => {
    try {
    let signer = await loadProvider()
    const contract = new ethers.Contract(address_one.PackageSale, SALEABI , signer)
    let purchaseMonthlyPackage = await contract.purchaseMonthlyPackage(pack_type , refferal_account)
    purchaseMonthlyPackage = await purchaseMonthlyPackage.wait()
    console.log("purchaseMonthlyPackage" , purchaseMonthlyPackage) 
    return true
    } catch (error) {
        console.log("purchaseMonthlyPackage" , error)   
    return false
    
    }
}

// const getPurchasedBalance= async (address , account , library , chainId) => {
//     try {
//     let signer = await loadProvider()
//     const contract = new ethers.Contract(address, crowdSale , signer)
//     let token_addr = await contract.token_addr()
//     const erc20 = new ethers.Contract(token_addr, IERC20 , signer)
//     let decimals = await erc20.decimals()
//     let purchase = await contract.purchase(account)
//     return ethers.utils.formatUnits(purchase.toString(),decimals)
//     } catch (error) {
//         console.log("getTokenDecimals" , error)   
//     return '0'
    
//     }
// }

// const getTokenSymbol = async (address , library , chainId) => {
//     try {
//     let signer = await loadProvider()
//     const contract = new ethers.Contract(address, IERC20 , signer)
//     let symbol = await contract.symbol()
//     return symbol
//     } catch (error) {
//         console.log("getTokenSymbol" , error)   
//     return "SYM"
    
//     }
// }

// const getWhitelisted = async (address , account , library , chainId) => {
//     try {
//     let signer = await loadProvider()
//     const contract = new ethers.Contract(address, crowdSale , signer)
//     let isWhitelisted = await contract.isWhitelisted(account)
//     console.log("iswhitelised" , isWhitelisted)
//     return isWhitelisted
//     } catch (error) {
//         console.log("getWhitelisted" , error)   
//     return false
    
//     }
// }

// const approveFactory = async (data , library , chainId) => {
//     try {
//     let signer = await loadProvider()
//     const contract = new ethers.Contract(data[0], IERC20 , signer)
//     console.log("Approve",ethers.utils.parseUnits(data[1],await getTokenDecimals(data[0],library,chainId)).toString())
//     let approve = await contract.approve(addresses[chainId].factory , ethers.utils.parseUnits(data[1],await getTokenDecimals(data[0],library,chainId)))
//     let tx = await approve.wait()
//     return tx
//     } catch (error) {
//         ERROR.catch_error(error, 'approveFactory')     
//     return false
    
//     }
// }




// const approve = async (address , amount , library , chainId) => {
//     try {
//     let signer = await loadProvider()
    
//     const contract = new ethers.Contract(address, crowdSale , signer)
//     let token_addr = await contract.BUSD()
//     const erc20 = new ethers.Contract(token_addr, IERC20 , signer)
//     let decimals = await erc20.decimals()
//     let approve = await erc20.approve(address, ethers.utils.parseUnits(amount,decimals))
//     let tx = await approve.wait()
//     return tx
//     } catch (error) {
//         ERROR.catch_error(error, 'approve')    
//     return false
    
//     }
// }

// const swap = async (address , library , chainId) => {
//     try {
//     let signer = await loadProvider()
//     const contract = new ethers.Contract(address, crowdSale , signer)
//     let buyTokens = await contract.buyTokens()
//     let tx = await buyTokens.wait()
//     return tx
//     } catch (error) {
//         ERROR.catch_error(error, 'approveFactory')  
//     return false
    
//     }
// }

// const claim = async (address , account , library , chainId) => {
//     try {
//     let signer = await loadProvider()
//     const contract = new ethers.Contract(addresses[chainId].Vesting, vesting , signer)
//     let release = await contract.release(address,account)
//     let tx = await release.wait()
//     return tx
//     } catch (error) {
//         ERROR.catch_error(error, 'claim')  
//     return false
    
//     }
// }

return {
    get_userMonthlyPurchaseIds,
    get_BUSDbalance,
    approve_busd,
    purchaseMonthlyPackage
    // approveFactory,
    // getWhitelisted,
    // getPurchasedBalance,
    // approve,
    // swap,
    // claim
}

}
const calls = createContractCalls();


export default calls;