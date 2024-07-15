import { useState, useEffect } from "react";
import { getAmountOfArtInMetAPI, getItemById } from "../utils";
import { getAmountOfArtInHarvardAPI, getHarvardItemById } from "../harvardUtils";
import ArtCard from "../artCards";

const BrowsePage = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchArtwork = async (append = false) => {
       
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

                if (item && item.primaryImageSmall && item.primaryImageSmall.length > 0) {
                    fetchedItems.push(item);
                }
                if (item2 && item2.images && item2.images[0]?.baseimageurl) {
                    fetchedItems.push(item2);
                } else {
                    maxTries++;
                }

                tries++;
            }

            setItems((prevItems) => append ? [...prevItems, ...fetchedItems] : fetchedItems);
        } catch (error) {
            console.error("Error fetching artwork:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchArtwork();
    }, []);

    if (isLoading) {
        return <section className="loading-screen">Results are loading...</section>;
    } else {
        return (
            <div className="browseCards">
                {items.map((item, index) => (
                    <ArtCard key={index} art={item} />
                ))}
                <button onClick={() => fetchArtwork(true)}>Load More</button>
            </div>
        );
    }
};

export default BrowsePage;