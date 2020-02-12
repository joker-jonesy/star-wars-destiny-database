import React from 'react';
import StyleOption from './StyleOption';
import {Styles} from './../../data/Style';
import { useSelector } from "react-redux";

function StyleOptions(props) {

    const style =useSelector(state=>state.style);

    let show;

    if (props.styles) {
        show={
            "right":"0",
            backgroundColor:style.navText,
            color:style.nav
        }
    }else{
        show={
            "right":"-100%",
            backgroundColor:style.navText,
            color:style.nav
        }
    }

    let styles = Styles.map((srt, idx) =>
        <StyleOption key={idx} opt={srt}/>
    );


    return (
        <div className={"navOptions"} style={show}>
            <div className={"top"}><h1 style={{color:style.nav}}>Change Style</h1></div>
            <div className={"wrapper"}>
                {styles}
            </div>
        </div>
    )
}





export default StyleOptions;

