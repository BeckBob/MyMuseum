import axios from "axios";

const api = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1/objects" })


export const getAmountOfArtInMetAPI = () => {
    
    return api.get().then((res ) => {
            return res.data.total
    }).catch ((err) => {
      
        return  Promise.reject(err.response.data)
    })
}
    

export const getItemById = (artId) => {
    return api.get(`/${artId}`).then((res) => {
        console.log(res)
        return res.data
    }).catch((err) => {
        console.log(err.response.data)
       
    })
}



