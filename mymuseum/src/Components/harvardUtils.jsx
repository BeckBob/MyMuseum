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

export const getHarvardItemByTitle = (searchParams) => {
    const apiKey = '2036d60b-2df2-40d1-9792-3636b9538b08';  
    const params = new URLSearchParams({
        apikey: apiKey,
        title: searchParams
   
    });

    return api.get(`?${params.toString()}`)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => {
            console.error('Error fetching data from Harvard API:', err.response?.data || err.message);
        });


}

export const getHarvardItemByMedium = (searchParams) => {
    const apiKey = '2036d60b-2df2-40d1-9792-3636b9538b08';
    const params = new URLSearchParams({
        apikey: apiKey,
        medium: searchParams
    });

    return api.get(`?${params.toString()}`)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => {
            console.error('Error fetching data from Harvard API:', err.response?.data || err.message);
        });


}
export const getHarvardItemByDate = (searchParams) => {
    const apiKey = '2036d60b-2df2-40d1-9792-3636b9538b08';
    const params = new URLSearchParams({
        apikey: apiKey,
        dated: searchParams
    });

    return api.get(`?${params.toString()}`)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => {
            console.error('Error fetching data from Harvard API:', err.response?.data || err.message);
        });


}

export const getHarvardItemByCentury = (searchParams) => {
    const apiKey = '2036d60b-2df2-40d1-9792-3636b9538b08';
    const params = new URLSearchParams({
        apikey: apiKey,
        century: searchParams
    });

    return api.get(`?${params.toString()}`)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => {
            console.error('Error fetching data from Harvard API:', err.response?.data || err.message);
        });


}

export const getHarvardItemByCulture = (searchParams) => {
    const apiKey = '2036d60b-2df2-40d1-9792-3636b9538b08';
    const params = new URLSearchParams({
        apikey: apiKey,
        culture: searchParams
    });

    return api.get(`?${params.toString()}`)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => {
            console.error('Error fetching data from Harvard API:', err.response?.data || err.message);
        });


}



export const getHarvardItemByTechnique = (searchParams) => {
    const apiKey = '2036d60b-2df2-40d1-9792-3636b9538b08';
    const params = new URLSearchParams({
        apikey: apiKey,
        technique: searchParams
    });

    return api.get(`?${params.toString()}`)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => {
            console.error('Error fetching data from Harvard API:', err.response?.data || err.message);
        });


}