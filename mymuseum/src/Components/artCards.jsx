import { Link } from "react-router-dom";

const ArtCard = ({ art }) => {
    
    let {
        title,
        primaryImageSmall,
        artistDisplayName, 
        objectDate,
        images = [],
        dated,
        people = [],
        objectID,
        objectid
    } = art;



    if (title.length > 37) {
        const indexOfFullStop = title.search("\\.");
        if (indexOfFullStop >= 0) {
            title = title.slice(0, indexOfFullStop);
        }
    }

    
    const isMetArt = Boolean(objectID);





    const link = isMetArt ? `/met/${objectID}` : `/harvard/${objectid}`;
    const imageUrl = isMetArt ? primaryImageSmall : (images[0]?.baseimageurl || '');
    const artistName = isMetArt ? artistDisplayName : (people[0]?.displayname || 'Unknown Artist');
    const date = isMetArt ? objectDate : dated;
    const id = isMetArt ? objectID : objectid;
    const titleOfPiece = title.length > 0 ? title : "Untitled";
    const artistsNameCatch = artistName.length > 0 ? artistName : "Unknown Artist";


    if (!imageUrl) {
        console.log('No image available for this art piece:', art);
    }

   
    return (
        <div className="art-card">
            <Link to={link} key={id} className="article-link">
                <img src={imageUrl} className="art-img" alt={titleOfPiece} />
                <h2 className="art-title">{titleOfPiece}</h2>
                <p className="artCardText">
                    By {artistsNameCatch} <br />
                    <br />
                    {date}
                    <br />
                </p>
            </Link>
        </div>
    );
};

export default ArtCard;