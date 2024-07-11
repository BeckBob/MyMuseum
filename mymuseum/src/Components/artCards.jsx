import { Link } from "react-router-dom"


const ArtCard = ({ art }) => {
    {
        console.log(art)
        let { title, primaryImageSmall, artistDisplayName, objectDate, images, dateend, people, objectID } = art;
        if (title.length > 37) {
            let indexOfFullStop = title.search(".")
            if (indexOfFullStop >= 0) {

                title = title.slice(0, indexOfFullStop)
                console.log(title);
            }
        }
        if (title.length === 0) {
            title = "Untitled"
        }

        if (primaryImageSmall) {
            if (artistDisplayName.length === 0) {artistDisplayName = "Unknown Artist" }
            return (
               <div className="art-card">
                    <Link to={`/met/${objectID}`} key={objectID} className="article-link">
                    <img src={primaryImageSmall} className="art-img" />
                    <h2 className="art-title">{title}</h2>
                    <p className="artCardText">By {artistDisplayName} <br />
                        
                        <br />
                        {objectDate}<br />
                    </p></Link>
                </div>
            );
        }
        else {
            console.log("returning HArvard one")
            return (
                
                <div className="art-card">
                    <Link to={`/harvard/${title}`} key={title} className="article-link">
                    <img src={images[0].baseimageurl} className="art-img" />
                    <h2 className="art-title">{title}</h2>
                    <p className="artCardText">By {people[0].displayname} <br />
                       
                        <br />
                        {dateend}<br />
                        </p>
                    </Link>
                    </div>
                
            );
        }
    }

}
export default ArtCard;