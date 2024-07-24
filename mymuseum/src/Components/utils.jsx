import axios from "axios";

const api = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1" })


export const getAmountOfArtInMetAPI = () => {
    
    return api.get(`/objects`).then((res ) => {
            return res.data.total
    }).catch ((err) => {
      
        return  Promise.reject(err.response.data)
    })
}
    

export const getItemById = (artId) => {
    return api.get(`/objects/${artId}`).then((res) => {
        
        return res.data
    }).catch((err) => {
        console.log(err.response.data)
       
    })
}

export const getMetItemsBySearch = (searchParam) => {
    return api.get(`/search?q=${searchParam}`).then((res) => {
        console.log(res.data)
        return res.data
    }).catch((err) => {
        console.log(err.response.data)
    })
}



