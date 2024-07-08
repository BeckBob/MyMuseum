import axios from "axios";

const api = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1/objects" })



export const getAmountOfArtInMetAPI = () => {
    
        return api.get().then((res) => {
            return res.total
        })
    }

export const getItemById = (artId) => {
    return api.get(`/${artId}`).then((res) => {
        return res
    })
}


