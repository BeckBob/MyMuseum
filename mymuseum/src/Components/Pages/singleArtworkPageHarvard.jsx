import { useEffect, useState } from "react";
import { getHarvardItemById } from "../harvardUtils.jsx";
import { useParams } from "react-router-dom";
import RouteError from "../../routeError";

import { useExhibition, useExhibitionUpdate } from "../Contexts/UsersExhibitionContext";

const SingleHarvardArtPage = () => {
    const [art, setArt] = useState({});
    const { art_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState("Anonymous");
    const [portrait, setPortrait] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [inExhibit, setInExhibit] = useState(false);
    const [nationality, setNationality] = useState("Unknown")

    const addToExhibit = useExhibitionUpdate();
    const userExhibit = useExhibition();

    useEffect(() => {
        const fetchArtwork = async () => {
            setIsLoading(true);
            try {
                const data = await getHarvardItemById(art_id);
                setArt(data);
                setArtist(data.people?.[0]?.displayname || "Anonymous");
                setNationality(data.people?.[0]?.birthplace || "Unknown")
                if (userExhibit.some(item => item.id === data.id)) {
                    setInExhibit(true);
                }

                const img = new Image();
                img.src = data.images?.[0]?.baseimageurl || "";
                img.onload = () => {
                    setPortrait(img.height > img.width);
                    setIsLoading(false);
                };
            } catch (err) {
                setErrorMessage(err?.response?.data?.msg || "An error occurred");
                setIsLoading(false);
            }
        };

        fetchArtwork();
    }, []);

    const handleAddToExhibit = () => {
        addToExhibit(art);
        setInExhibit(prev => !prev);
    };

    if (isLoading) {
        return <section className="loading-screen">Loading...</section>;
    } else if (errorMessage) {
        return <RouteError message={errorMessage} />;
    } else {
        return (
            <div className="single-art-card">
                <section className={!portrait ? "single-art-header-box" : "single-art-header-box header-portrait"}>
                    <h3 className={!portrait ? "single-art-header" : "single-art-header single-art-header-portrait"}>{art.title}</h3>
                </section>
                <div className={!portrait ? "single-art-mainContents" : "single-art-mainContents mainContents-portrait"}>
                    <img className={!portrait ? "single-art-img" : "single-art-img img-portrait"} src={art.images?.[0]?.baseimageurl} alt={art.title} />
                    <div className={!portrait ? "single-art-text" : "single-art-text text-portrait"}>
                        <h4 className={!portrait ? "single-art-displayName" : "single-art-displayName displayName-portrait"}>By {artist}</h4>
                        <div className={!portrait ? "single-art-body-whole" : "single-art-body-whole body-portrait"}>
                            <p className={!portrait ? "single-art-body" : "single-art-body body-text-portrait"}>
                                {art.medium}<br />
                                {art.dated}<br />
                                Currently at Harvard Art Museums {art.department}
                            </p>
                            <p className={!portrait ? "single-art-body2" : "single-art-body2 body-text-portrait2"}>
                                Artist From: {nationality}<br />
                                Dimensions: {art.dimensions}<br />
                                
                                <a href={art.url} target="_blank" rel="noopener noreferrer" className="art-link">
                                    {art.url}
                                </a>
                                
                            </p>
                        </div>
                        <button className={!portrait ? "single-addto-button" : "portrait-single-addto-button"} onClick={handleAddToExhibit}>{inExhibit ? "Remove from Exhibition" : "Add to Exhibition"}</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default SingleHarvardArtPage;