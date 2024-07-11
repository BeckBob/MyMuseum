import { useEffect, useState } from "react";
import { getItemById } from "../utils";

import { useParams } from "react-router-dom";
import RouteError from "../../routeError";
import { Link } from "react-router-dom"

const SingleMetArtPage = () => {
    const [art, setArt] = useState({});
    const { art_id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [artist, setArtist] = useState("")
    const [portrait, setPortrait] = useState(false);
    
 
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchArtwork = async () => {
            setIsLoading(true);
            try {
                const data = await getItemById(art_id)

                setIsLoading(false)
                await setArt(data)
                let img = new Image();
                img.src = art.primaryImage;
                console.log(img.width)
                console.log(img.height)
                if (img.height > img.width) {
                    setPortrait(true);
                }
                else {
                    setPortrait(false);
                }
                if (art.artistDisplayName) {
                    setArtist(art.artistDisplayName)
                } else { setArtist("Anonymous") }

            } catch (err) {

                setErrorMessage(err.response.data.msg)
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArtwork();
}, []);

  



    if (isLoading) {
        return <section className="loading-screen">loading...</section>
    }
    else if (errorMessage) {
        return <RouteError message={errorMessage} />
    }
    else
        return (
            <div className="single-art-card">
                <section className={!portrait ? "single-art-header-box" : "single-art-header-box header-portrait"}><h3 className={!portrait ? "single-art-header" : "single-art-header header-portrait"}>{art.title}</h3>
                </section>
                <div className={!portrait ? "single-art-mainContents" : "single-art-dislayName mainContents-portrait"}>
                    <img className={!portrait ? "single-art-img" : "single-art-img img-portrait"} src={art.primaryImage} />
                    <div className={!portrait ? "single-art-text" : "single-art-text text-portrait"}>
                <h4 className={!portrait ? "single-art-displayName" : "single-art-dislayName displayName-portrait"}>By {artist}</h4>
                <div className={!portrait ? "single-art-body-whole" : "single-art-body-whole body-portrait"}>
                            <p className={!portrait ? "single-art-body" : "single-art-body body-text-portrait"}>
                    {art.medium}   <br />
                
                    {art.objectDate}<br />
                    
                    currently at {art.repository}
                </p>
                            <p className={!portrait ? "single-art-body2" : "single-art-body2 body-text-portrait2"}>
                    artist bio: {art.artistDisplayBio}<br />
                    dimesnions: {art.dimensions}<br />
                    <Link to={art.objectURL} key={art.objectURL} className="art-link">{art.objectURL}</Link>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        );
};


export default SingleMetArtPage