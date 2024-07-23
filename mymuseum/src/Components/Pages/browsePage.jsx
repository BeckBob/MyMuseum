import { useState, useEffect } from "react";
import { getAmountOfArtInMetAPI, getItemById } from "../utils";
import { getAmountOfArtInHarvardAPI, getHarvardItemById, getHarvardItemByTitle } from "../harvardUtils";
import ArtCard from "../artCards";

const BrowsePage = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParam, setSearchParam] = useState("");

    const fetchArtwork = async (append = false) => {
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

                const [item, item2] = await Promise.all([
                    getItemById(randomNumber),
                    getHarvardItemById(randomNumber2)
                ]);

                if (item && item.primaryImageSmall && item.primaryImageSmall.length > 0) {
                    fetchedItems.push(item);
                }
                if (item2 && item2.images && item2.images.length > 0 && item2.images[0].baseimageurl) {
                    fetchedItems.push(item2);
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

    const searchArtworksetParam = (event) => {
        setSearchParam(event.target.value);
    };

    const searchArtworks = async () => {
        setIsLoading(true);
        try {
            const fetchedItems = await getHarvardItemByTitle(searchParam);
            const filteredItems = fetchedItems.records.filter((item) =>
               
               item.primaryimageurl
            );
            console.log(filteredItems)
            setItems(filteredItems);
        } catch (error) {
            console.error("Error searching artwork:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArtwork();
    }, []);

    if (isLoading) {
        return <section className="loading-screen">Results are loading...</section>;
    } else {
        return (
            <div>
                <form>
                    <div className="search-div">
                        <input
                            onChange={searchArtworksetParam}
                            placeholder="search"
                            id="search-bar"
                            value={searchParam}
                        />
                        <button onClick={searchArtworks} type="button" id="search-button">Search</button>
                    </div>
                </form>
                <div className="browseCards">
                    {items.map((item, index) => (
                        <ArtCard key={index} art={item} />
                    ))}
                </div>
                <button onClick={() => fetchArtwork(true)}>Load More</button>
            </div>
        );
    }
};

export default BrowsePage;
