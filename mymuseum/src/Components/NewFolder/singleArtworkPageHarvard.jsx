import { useEffect, useState } from "react";
import { getHarvardItemById } from "../harvardUtils.jsx";
import { useParams } from "react-router-dom";
import RouteError from "../../routeError";
import { Link } from "react-router-dom";

const SingleHarvardArtPage = () => {
    const [art, setArt] = useState({});
    const { art_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState("Anonymous");
    const [portrait, setPortrait] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchArtwork = async () => {
            setIsLoading(true);
            try {
                const data = await getHarvardItemById(art_id);
                setArt(data);
                setArtist(data.people?.[0]?.displayname || "Anonymous");

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
    }, [art_id]);

    if (isLoading) {
        return <section className="loading-screen">Loading...</section>;
    } else if (errorMessage) {
        return <RouteError message={errorMessage} />;
    } else {
        return (
            <div className="single-art-card">
                <section className={`single-art-header-box ${portrait ? "header-portrait" : ""}`}>
                    <h3 className={`single-art-header ${portrait ? "header-portrait" : ""}`}>{art.title}</h3>
                </section>
                <div className={`single-art-mainContents ${portrait ? "mainContents-portrait" : ""}`}>
                    <img className={`single-art-img ${portrait ? "img-portrait" : ""}`} src={art.images?.[0]?.baseimageurl} alt={art.title} />
                    <div className={`single-art-text ${portrait ? "text-portrait" : ""}`}>
                        <h4 className={`single-art-displayName ${portrait ? "displayName-portrait" : ""}`}>By {artist}</h4>
                        <div className={`single-art-body-whole ${portrait ? "body-portrait" : ""}`}>
                            <p className={`single-art-body ${portrait ? "body-text-portrait" : ""}`}>
                                {art.medium}<br />
                                {art.dateend}<br />
                                currently at {art.repository}
                            </p>
                            <p className={`single-art-body2 ${portrait ? "body-text-portrait2" : ""}`}>
                                artist bio: {art.artistDisplayBio}<br />
                                dimensions: {art.dimensions}<br />
                                {art.images?.[0]?.baseimageurl && (
                                    <Link to={{ pathname: art.images[0].baseimageurl }} target="_blank" className="art-link">
                                        {art.images[0].baseimageurl}
                                    </Link>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SingleHarvardArtPage;