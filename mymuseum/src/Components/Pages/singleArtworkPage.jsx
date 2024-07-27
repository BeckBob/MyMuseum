import { useEffect, useState } from "react";
import { getItemById } from "../utils";
import { useParams } from "react-router-dom";
import RouteError from "../../routeError";
import { Link } from "react-router-dom";
import {useExhibition ,useExhibitionUpdate } from "../Contexts/UsersExhibitionContext";

const SingleMetArtPage = () => {
    const [art, setArt] = useState({});
    const { art_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState("Anonymous");
    const [portrait, setPortrait] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [inExhibit, setInExhibit] = useState(false);
    
    const addToExhibit = useExhibitionUpdate();
    const userExhibit = useExhibition();

    useEffect(() => {
        const fetchArtwork = async () => {
            setIsLoading(true);
            try {
                const data = await getItemById(art_id);
                setArt(data);
                setArtist(data.artistDisplayName || "Anonymous");
                if (userExhibit.some(item => item.objectID === data.objectID)) {
                    setInExhibit(true);
                }
                const img = new Image();
                img.src = data.primaryImage;
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
    }, [art_id]);

    const handleAddToExhibit = () => {
        addToExhibit(art);
        setInExhibit(!inExhibit);
    };

    if (isLoading) {
        return <section className="loading-screen">Loading...</section>;
    } else if (errorMessage) {
        return <RouteError message={errorMessage} />;
    } else {
        return (
            <div className="single-art-card">
                <section className={!portrait ? "single-art-header-box" : "single-art-header-box header-portrait"}>
                    <h3 className={!portrait ? "single-art-header" : "single-art-header header-portrait"}>{art.title}</h3>
                </section>
                <div className={!portrait ? "single-art-mainContents" : "single-art-dislayName mainContents-portrait"}>
                    <img className={!portrait ? "single-art-img" : "single-art-img img-portrait"} src={art.primaryImage} alt={art.title} />
                    <div className={!portrait ? "single-art-text" : "single-art-text text-portrait"}>
                        <h4 className={!portrait ? "single-art-displayName" : "single-art-displayName displayName-portrait"}>By {artist}</h4>
                        <div className={!portrait ? "single-art-body-whole" : "single-art-body-whole body-portrait"}>
                            <p className={!portrait ? "single-art-body" : "single-art-body body-text-portrait"}>
                                {art.medium}<br />
                                {art.objectDate}<br />
                                currently at {art.repository}
                            </p>
                            <p className={!portrait ? "single-art-body2" : "single-art-body2 body-text-portrait2"}>
                                artist bio: {art.artistDisplayBio}<br />
                                dimensions: {art.dimensions}<br />
                                <Link to={{ pathname: art.objectURL }} target="_blank" className="art-link">{art.objectURL}</Link>
                            </p>
                        </div>
                        <button className={!portrait ? "single-addto-button" : "portrait-single-addto-button"} onClick={handleAddToExhibit}>{inExhibit ? "Remove from Exhibition" : "Add to Exhibition"}</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default SingleMetArtPage;