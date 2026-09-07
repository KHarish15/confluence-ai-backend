import { Link, useLocation } from "react-router-dom";

function Navbar() {

    const location = useLocation();

    return (

        <nav className="navbar">

            <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
            >
                Document Summarization
            </Link>

            <Link
                to="/qa"
                className={location.pathname === "/qa" ? "active" : ""}
            >
                Q & A
            </Link>

            <Link
                to="/update"
                className={location.pathname === "/update" ? "active" : ""}
            >
                Document Update
            </Link>

        </nav>

    );

}

export default Navbar;