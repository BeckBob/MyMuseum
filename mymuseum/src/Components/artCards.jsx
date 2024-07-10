const ArtCard = ({ art } ) => {
    {
        console.log(art)
        const { title, primaryImageSmall, artistDisplayName, objectDate, images, dateend, people } = art;
        if (primaryImageSmall) {
            return (
                <div className="art-card">

                    <img src={primaryImageSmall} className="art-img" />
                    <h2 className="art-title">{title}</h2>
                    <p className="artCardText">By {artistDisplayName} <br />
                        
                        <br />
                        {objectDate}<br />
                    </p>
                </div>
            );
        }
        else {
            console.log("returning HArvard one")
            return (
                <div className="art-card">

                    <img src={images[0].baseimageurl} className="art-img" />
                    <h2 className="art-title">{title}</h2>
                    <p className="artCardText">By {people[0].displayname} <br />
                       
                        <br />
                        {dateend}<br />
                    </p>
                </div>
            );
        }
    }

}
export default ArtCard;