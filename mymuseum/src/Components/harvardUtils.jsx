import axios from "axios";

const api = axios.create({
    baseURL: "https://api.harvardartmuseums.org/object"
})


export const getAmountOfArtInHarvardAPI = () => {

    return api.get(`?apikey=2036d60b-2df2-40d1-9792-3636b9538b08`).then((res) => {
        return res.data.info.totalrecords
    }).catch((err) => {

        return Promise.reject(err.response.data)
    })
}


export const getHarvardItemById = (artId) => {
    return api.get(`/${artId}?apikey=2036d60b-2df2-40d1-9792-3636b9538b08`).then((res) => {
    
        return res.data
    }).catch((err) => {
        console.log(err.response.data)

    })
}