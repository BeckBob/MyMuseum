import { useState, useEffect } from "react";
import { getAmountOfArtInMetAPI, getItemById } from "../utils";



import ArtCard from "../artCards";

const BrowsePage = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
 

    useEffect(() => {
        const fetchArtwork = async () => {
            setIsLoading(true);
            try {
                const amount = await getAmountOfArtInMetAPI();
                console.log(amount);

                let fetchedItems = [];
                let maxTries = 10;
                let tries = 0;

                while (fetchedItems.length < 5 && tries < maxTries) {
                    const randomNumber = Math.floor(Math.random() * amount) + 1;
                    console.log(randomNumber);

                    const item = await getItemById(randomNumber);
                    console.log(item);

                    if (item && item.primaryImageSmall && item.primaryImageSmall.length > 0) {
                        fetchedItems.push(item);
                    } else {
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