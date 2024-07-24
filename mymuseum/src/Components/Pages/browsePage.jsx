import { useState, useEffect } from "react";
import { getAmountOfArtInMetAPI, getItemById, getMetItemsBySearch } from "../utils";
import {
    getAmountOfArtInHarvardAPI,
    getHarvardItemById,
    getHarvardItemByTitle,
    getHarvardItemByMedium,
    getHarvardItemByCentury,
    getHarvardItemByDate,
    getHarvardItemByCulture,
    getHarvardItemByTechnique
} from "../harvardUtils";
import ArtCard from "../artCards";

const BrowsePage = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParam, setSearchParam] = useState("");
    const [inSearch, setInSearch] = useState(false);
    const [searchLimits, setSearchLimits] = useState({ start: 0, limit: 10 });

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

    const handleSearchParamChange = (event) => {
        setSearchParam(event.target.value);
    };

    const searchArtworks = async (append = false) => {
        setIsLoading(true);
        try {
            const [
                itemsByTitle,
                itemsByMedium,
                itemsByCentury,
                itemsByCulture,
                itemsByDate,
                itemsByTechnique,
                metItems
            ] = await Promise.all([
                getHarvardItemByTitle(searchParam),
                getHarvardItemByMedium(searchParam),
                getHarvardItemByCentury(searchParam),
                getHarvardItemByCulture(searchParam),
                getHarvardItemByDate(searchParam),
                getHarvardItemByTechnique(searchParam),
                getMetItemsBySearch(searchParam)
            ]);

            const metItemsArray = await Promise.all(
                metItems.objectIDs.slice(searchLimits.start, searchLimits.limit).map(id => getItemById(id))
            );

            setSearchLimits(prevLimits => ({
                start: prevLimits.start + 10,
                limit: prevLimits.limit + 10
            }));

            const filteredItems = [
                ...itemsByTitle.records,
                ...itemsByMedium.records,
                ...itemsByCentury.records,
                ...itemsByCulture.records,
                ...itemsByDate.records,
                ...itemsByTechnique.records,
                ...metItemsArray
            ].filter((item) =>
                item.primaryimageurl || item.primaryImageSmall
            );

            setItems((prevItems) => append ? [...prevItems, ...filteredItems] : filteredItems);
            setInSearch(true);
        } catch (error) {
            console.error("Error searching artwork:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchLimits({ start: 0, limit: 10 });
        searchArtworks();
    };

    const handleMoreButton = (e) => {
        e.preventDefault();
        if (inSearch) {
            searchArtworks(true);
        } else {
            fetchArtwork(true);
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
                <form method="POST" name="searchform" id="searchform" onSubmit={handleSearchSubmit}>
                    <div className="search-div">
                        <input
                            onChange={handleSearchParamChange}
                            placeholder="search"
                            id="search-bar"
                            value={searchParam}
                        />
                        <button type="submit" id="search-button">Search</button>
                    </div>
                </form>
                <div className="browseCards">
                    {items.map((item, index) => (
                        <ArtCard key={index} art={item} />
                    ))}
                </div>
                <button onClick={handleMoreButton}>Load More</button>
            </div>
        );
    }
};

export default BrowsePage;