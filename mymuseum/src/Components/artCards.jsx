import { Link } from "react-router-dom";

const ArtCard = ({ art }) => {
    
    let {
        title,
        primaryImageSmall,
        artistDisplayName, 
        objectDate,
        dated,
        people = [],
        primaryimageurl,
        objectID,
        objectid
    } = art;



    if (title.length > 25) {
  
        title = title.slice(0, 25) + "...";
        
    }

    
    const isMetArt = Boolean(objectID);





    const link = isMetArt ? `/met/${objectID}` : `/harvard/${objectid}`;
    const imageUrl = isMetArt ? primaryImageSmall : (primaryimageurl);
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
                <div className="art-img-container"><img src={imageUrl} className="art-img" alt={titleOfPiece} /></div>
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