import { useState, useEffect } from "react";
import ArtCard from "../artCards";
import { useExhibition } from "../Contexts/UsersExhibitionContext";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const PersonalExhibitionPage = () => {
    const exhibitionItems = useExhibition();
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

    const sortAlphabetically = (e) => {
        e.preventDefault();
        const sortedItems = [...items].sort((a, b) => a.title.localeCompare(b.title));
        setItems(sortedItems);
    };

    const reverseSortAlphabetically = (e) => {
        e.preventDefault();
        const sortedItems = [...items].sort((a, b) => b.title.localeCompare(a.title));
        setItems(sortedItems);
    };

    if (isLoading) {
        return <section className="loading-screen">Results are loading...</section>;
    } 
    if (items.length < 1) {
       return <section className="loading-screen">Exhibition empty</section>;
    }

    if (!carousel) {
        return (
            <div> <div className="button-container">
                <button className="carousel-Button" onClick={changeView}>Carousel</button>
        
               
                <DropdownButton id="dropdown-basic-button2" title="Sort By" className="dropdown-button-group">
                    <Dropdown.Item href="#/action-1" onClick={sortAlphabetically}>A-Z</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={reverseSortAlphabetically}>Z-A</Dropdown.Item>

                    </DropdownButton>
                </div>
            <div className="browseCards">
               
                {items.map((item, index) => (
                    <ArtCard key={index} art={item} />
                ))}
                </div>
            </div>
        );
    }


  
        return (
            <div> <div className="button-container">
                <button className="viewAll-Button" onClick={changeView}>View All</button>
                
                <DropdownButton id="dropdown-basic-button2" title="Sort By" className="dropdown-button-group">
                    <Dropdown.Item href="#/action-1" onClick={sortAlphabetically}>A-Z</Dropdown.Item>
                    <Dropdown.Item href="#/action-2" onClick={reverseSortAlphabetically}>Z-A</Dropdown.Item>

                    </DropdownButton>
                </div>
                <div key={items.length} className="carousel2">
                    <BsArrowLeftCircleFill className="arrow arrow-left" onClick={prevSlide} />
                    {items.map((item, index) => (
                        <div key={item.objectID || item.objectid} className="carouselContents">
                          
                           
                            {item.primaryImageSmall ? (
                                <Link to={`/met/${item.objectID}`} className="article-link">
                                    <img
                                        src={item.primaryImageSmall}
                                        alt={item.title}
                                        className={slide === index ? "slide2" : "slide slide-hidden"}
                                    />
                                </Link>
                            ) : (
                                <Link to={`/harvard/${item.objectid}`} className="article-link">
                                    <img
                                        src={item.images?.[0]?.baseimageurl}
                                        alt={item.title}
                                        className={slide === index ? "slide2" : "slide slide-hidden"}
                                    />
                                </Link>
                                )}
                        
                              <div className={slide === index ? "text-container" : "text-container text-container-hidden"}>
                            <h2 className={slide === index ? "slideHeader" : "slideHeader slideHeader-hidden"}>{item.title}</h2>
                            <p className={slide === index ? "slideP" : "slideP slideP-hidden"}>
                                By {item.objectID ? (item.artistDisplayName || 'Unknown Artist') : (item.people?.[0]?.displayname || 'Unknown Artist')} <br />
                                <br />
                                {item.objectID ? item.objectEndDate : item.dated}
                                <br />
                            </p>
                            </div>
                        </div>
                        
                    ))}
                    <BsArrowRightCircleFill className="arrow arrow-right" onClick={nextSlide} />
                    <span className="indicators2">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => selectSpecificSlide(index)}
                                className={slide === index ? "indicator2" : "indicator indicator-inactive"}>
                            </button>
                        ))}
                    </span>
                </div>
            </div>
        );
    };

    
export default PersonalExhibitionPage;