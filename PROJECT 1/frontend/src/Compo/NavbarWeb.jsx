import { Link } from "react-router-dom";

function NavbarWeb(){

    return(
        <>
            <header>
                <div className="navbar">
                    <div className="nav-home ">
                        <Link to="/"  className="border">Home</Link>
                        {/* <Link to="#" className="border a3">About Us.</Link> */}
                        <Link to="/Login" ><div className="nav-login border">Login</div></Link>
                        <Link to="/Sign-up"><div className="nav-signup border">Sign Up</div></Link>
                    </div>
                </div>
            </header>
        </>
    );

}

export default NavbarWeb