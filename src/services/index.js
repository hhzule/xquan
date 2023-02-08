import axios from "axios";

const createBackendServer = baseURL => {
    const api = axios.create({
        baseURL,
        headers: {'Accept': 'application/json'},
        timeout: 60 * 1000
    });

    /*==========    GET REQUESTS    ==========*/

    const getAllIdos = () => api.get('/api/ido');

    const getTypeIdos = (chainid) => api.get(`/api/ido/type/${chainid}`);
    
    
    const getSingleIdo = (address) => api.get(`/api/ido/${address}`);

    const getUpcommingIdo = () => api.get(`/api/ido/status/1`);

    const getLiveIdo = () => api.get(`/api/ido/status/2`);

    const getEndedIdo = () => api.get(`/api/ido/status/3`);

    
    

    return { getAllIdos , getTypeIdos , getSingleIdo , getUpcommingIdo , getLiveIdo , getEndedIdo};

};

const apis = createBackendServer(process.env.REACT_APP_BSE_API_URL);


export default apis;