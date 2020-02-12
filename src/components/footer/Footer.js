import React from 'react';
import { useSelector } from "react-redux";
import {
    Link
} from "react-router-dom";


function Footer() {

    const style =useSelector(state=>state.style);

    let styler = {
        backgroundColor: style.nav,
        color: style.navText,
        borderTop: "5px solid " + style.bodyText
    };

    return (
        <footer style={styler}>
            <div className={"wrp"}>
                <p>Learn <Link to={"/about"} style={{color: style.bodyText}}>About</Link> the web app</p>
                <p>View the <a href={"http://swdestinydb.com/api/"} target={"_blank"} rel="noopener noreferrer"
                               style={{color: style.bodyText}}>API</a> used to power this Database</p>
                <p>Post Issues and view the Repository here at <a style={{color: style.bodyText}}
                                                                  href={"https://github.com/joker-jonesy/star-wars-destiny-database"}
                                                                  target={"_blank"} rel="noopener noreferrer">GitHub</a></p>
                <p>The information presented on this site about Star Wars Destiny, both literal and graphical, is
                    copyrighted by Fantasy Flight Games. This website is not produced, endorsed, supported, or
                    affiliated with Fantasy Flight Games.</p>
            </div>
        </footer>
    )
}



export default Footer