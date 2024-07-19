import { useState, useEffect } from "react";
import { getAmountOfArtInMetAPI, getItemById } from "./utils";
import { Link } from "react-router-dom";

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./randomArtworkDisplay.css";

const RandomArtworkDisplay = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const fetchArtwork = async () => {
            setIsLoading(true);
            try {
                const amount = await getAmountOfArtInMetAPI();
               

                let fetchedItems = [];
                let maxTries = 5;
                let tries = 0;

                while (fetchedItems.length < 5 && tries < maxTries) {
                    const randomNumber = Math.floor(Math.random() * amount) + 1;
                   

                    const item = await getItemById(randomNumber);
                 

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

    const nextSlide = () => {
        if (slide === 4) { setSlide(0) }
        else {
            setSlide(slide + 1)
        }
    }

    const prevSlide = () => {
        if (slide === 0) {
            setSlide(4)
        }
        else {
            setSlide(slide - 1)
        }
    }

    const selectSpecificSlide = (index) => {
        setSlide(index)
    }

    if (isLoading) {
        return <section className="loading-screen">Results are loading...</section>;
    } else {
        return (
            <div key={items.length} className="carousel">
                <BsArrowLeftCircleFill className="arrow arrow-left" onClick={ prevSlide} />
                {items.map((item, index) => (
                    <Link to={`/met/${item.objectID}`} key={item.objectID} className="article-link">
                        <img src={item.primaryImageSmall} alt={item.title} key={index} className={slide === index ? "slide" : "slide slide-hidden"} />
                    </Link>
                ))}
                <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide} />
                <span className="indicators">
                    {items.map((_, index) => { return <button key={index} onClick={() => selectSpecificSlide(index)} className={slide === index ? "indicator" : "indicator indicator-inactive"}></button> })}
                </span>
            </div>
        );
    }
};

export default RandomArtworkDisplay;