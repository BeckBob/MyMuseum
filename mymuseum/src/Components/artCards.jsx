const ArtCard = ({ art } ) => {
    {
        console.log(art)
        const {title, primaryImageSmall, artistDisplayName, objectDate, country} = art;
      
        return (
            <div className="art-card">
                
                <img src={primaryImageSmall} className="art-img" />
                <h2 className="art-title">{title}</h2>
                <p>By {artistDisplayName} <br />
                    {title}
                    <br />
                    {objectDate}<br />
                    Created in {country}<br /></p>
            </div>
        );
    }

}
export default ArtCard;