import { Link } from "react-router-dom"




const Navbar = () => {
   
  


    return (
        <div><nav>
            <Link to={"/"} className="nav-text"> Home </Link>
            <Link to={"/browse"} className="nav-text"> Browse </Link>
            <Link to={"/myExhibition"} className="nav-text"> My Exhibition </Link>

        </nav>

        </div>)
}


export default Navbar