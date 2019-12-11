import React from 'react';
import {connect} from 'react-redux';
import {
    Link
} from "react-router-dom";


function Footer(props) {

    let style = {
        backgroundColor: props.style.nav,
        color: props.style.navText,
        borderTop: "5px solid " + props.style.bodyText
    };

    return (
        <footer style={style}>
            <div className={"wrp"}>
                <p>Learn <Link to={"/about"} style={{color: props.style.bodyText}}>About</Link> the web app</p>
                <p>View the <a href={"http://swdestinydb.com/api/"} target={"_blank"}
                               style={{color: props.style.bodyText}}>API</a> used to power this Database</p>
                <p>Post Issues and view the Repository here at <a style={{color: props.style.bodyText}}
                                                                  href={"https://github.com/joker-jonesy/star-wars-destiny-database"}
                                                                  target={"_blank"}>GitHub</a></p>
                <p>The information presented on this site about Star Wars Destiny, both literal and graphical, is
                    copyrighted by Fantasy Flight Games. This website is not produced, endorsed, supported, or
                    affiliated with Fantasy Flight Games.</p>
            </div>
        </footer>
    )
}

const mapStateToProps = (state) => {
    return {
        style: state.style
    }
};

export default connect(mapStateToProps)(Footer)