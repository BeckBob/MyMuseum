import { useState, useEffect } from "react";
import { getAmountOfArtInMetAPI, getItemById } from "../utils";
import {getAmountOfArtInHarvardAPI, getHarvardItemById } from "../harvardUtils"


import ArtCard from "../artCards";

const BrowsePage = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
 

    useEffect(() => {
        const fetchArtwork = async () => {
            setIsLoading(true);
            try {
                const amount = await getAmountOfArtInMetAPI();
                const amount2 = await getAmountOfArtInHarvardAPI();
               

                let fetchedItems = [];
                let maxTries = 15;
                let tries = 0;

                while (fetchedItems.length < 12 && tries < maxTries) {
                    const randomNumber = Math.floor(Math.random() * amount) + 1;
                    const randomNumber2 = Math.floor(Math.random() * amount2) + 200000;
                    

                    const item = await getItemById(randomNumber);

                    const item2 = await getHarvardItemById(randomNumber2);
                    console.log(randomNumber2)

                    if (item && item.primaryImageSmall && item.primaryImageSmall.length > 0) {
                        fetchedItems.push(item);
                      
                    }
                    if (item2 && item2.items && item2.images[0].baseimageurl) {
                        fetchedItems.push(item2)
                    }
                    else {
                        maxTries++;
                    }

                    tries++;
                }

                setItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching artwork:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtwork();
    }, []);



    if (isLoading) {
        return <section className="loading-screen">Results are loading...</section>;
    } else {
        return (
            <div key={items.length} className="browseCards">
              
                {items.map((item, index) => (
                    <ArtCard key={index} art={item} />
                ))}
               
            </div>
        );
    }
};

export default BrowsePage;