import React from "react";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";

function Navbar()
{
    const [cookies,setCookies]=useCookies("access_token");
    const navigate=useNavigate();

    const logout=()=>{
        setCookies("access_token","");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }
    return (<div className="navbar">
        <Link className="link1" to="/">Home</Link>
        <Link className="link1" to="/create-recipe">Create Recipes</Link>
        {cookies.access_token ? <Link className="link1" to="/saved-recipe">Saved Recipes</Link>: null}
        {!cookies.access_token ? <Link className="link1" to="/auth">Register/Login</Link>: <button className="b" onClick={logout}>Logout</button>}
       
    </div>);
}

export default Navbar;