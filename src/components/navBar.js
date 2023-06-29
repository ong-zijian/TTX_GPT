import React from "react";
import "../stylesheet/navStyle.css";

export default class Navbar extends React.Component{
    state = {

    };

    render() {
        return(
            <nav className="navbar" style={{color:"#1c2e4a"}}>
                <p className="home-name">TTX GPT</p>
            </nav>
        )
    }
}