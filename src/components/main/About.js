import React from 'react';
import { useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome/index';
import {faTimes} from '@fortawesome/free-solid-svg-icons/index';
import {
    Link
} from "react-router-dom";
import IMG from '../../assets/schoolImage.jpeg';


function About(props){

    const style =useSelector(state=>state.style);

    return(
        <Link className={"about"} to={"/"}>
            <div className={"close"} style={{backgroundColor: style.navText, color: style.nav}}>
                <FontAwesomeIcon icon={faTimes} size={"4x"}/>
            </div>
            <div className={"aboutWrp"}>
                <h1>About the App</h1>
                <p>Star Wars: Destiny Database is a web application built to help enthusiasts of the dice and card game find the card they need quicker and faster based on the criteria they desire.</p>
                <img alt={"Lukes Profile"} src={IMG}/>
                <h1>About the Developer</h1>
                <p>Luke Jones is a web applications instructor who teaches at Purdue University of Indianapolis. On his spare time, he enjoys developing fun web apps and playing a variety of tabletop games.</p>
            </div>
        </Link>
    )
}

export default About;