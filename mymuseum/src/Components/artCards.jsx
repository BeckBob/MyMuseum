import { Link } from "react-router-dom";

const ArtCard = ({ art }) => {
    // Destructuring with fallback values
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

    // Truncate title if it's too long and contains a full stop
    if (title.length > 37) {
        const indexOfFullStop = title.search("\\.");
        if (indexOfFullStop >= 0) {
            title = title.slice(0, indexOfFullStop);
        }
    }

    // Determine if the item is from Met or Harvard
    const isMetArt = Boolean(objectID);

    // Log the art object to debug
    console.log('Art object:', art);
    console.log('Is Met Art:', isMetArt);

    // Set link and image based on source
    const link = isMetArt ? `/met/${objectID}` : `/harvard/${objectid}`;
    const imageUrl = isMetArt ? primaryImageSmall : (images[0]?.baseimageurl || '');
    const artistName = isMetArt ? artistDisplayName : (people[0]?.displayname || 'Unknown Artist');
    const date = isMetArt ? objectDate : dated;
    const id = isMetArt ? objectID : objectid;
    const titleOfPiece = title.length > 0 ? title : "Untitled";
    const artistsNameCatch = artistName.length > 0 ? artistName : "Unknown Artist";

    // Check if imageUrl is available
    if (!imageUrl) {
        console.log('No image available for this art piece:', art);
    }

    // Render the art card
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