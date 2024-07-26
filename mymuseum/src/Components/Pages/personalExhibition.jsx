import { useState, useEffect } from "react";
import ArtCard from "../artCards";
import { useExhibition } from "../Contexts/UsersExhibitionContext";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const PersonalExhibitionPage = () => {
    const exhibitionItems = useExhibition(); // Use the hook directly in the component
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [carousel, setCarousel] = useState(false);
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        if (exhibitionItems) {
            setItems(exhibitionItems);
            setIsLoading(false);
        }
    }, [exhibitionItems]);

    const changeView = () => {
        setCarousel(!carousel);
    };

    const nextSlide = () => {
        if (slide === items.length - 1) {
            setSlide(0);
        } else {
            setSlide(slide + 1);
        }
    };

    const prevSlide = () => {
        if (slide === 0) {
            setSlide(items.length - 1);
        } else {
            setSlide(slide - 1);
        }
    };

    const selectSpecificSlide = (index) => {
        setSlide(index);
    };

    if (isLoading) {
        return <section className="loading-screen">Results are loading...</section>;
    }

    if (!carousel) {
        return (
            <div>
             <button onClick={changeView}>Carousel</button>
            <div className="browseCards">
               
                {items.map((item, index) => (
                    <ArtCard key={index} art={item} />
                ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <button onClick={changeView}>View All</button>
            <div key={items.length} className="carousel">
                <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide} />
                {items.map((item, index) => (item.primaryImageSmall?
                    <Link to={`/met/${item.objectID}`} key={item.objectID} className="article-link">
                        <img src={item.primaryImageSmall} alt={item.title} className={slide === index ? "slide" : "slide slide-hidden"} />
                    </Link> :
                    <Link to={`/harvard/${item.objectid}`} key={item.objectid} className="article-link">
                        <img src={item.images?.[0]?.baseimageurl} alt={item.title} className={slide === index ? "slide" : "slide slide-hidden"} />
                    </Link>
                ))}
                <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide} />
                <span className="indicators">
                    {items.map((_, index) => (
                        <button key={index} onClick={() => selectSpecificSlide(index)} className={slide === index ? "indicator" : "indicator indicator-inactive"}></button>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default PersonalExhibitionPage;