import React from 'react';
import { useSelector } from "react-redux";

function Button(props){

    const [hover, setHover] = React.useState(false)
    const style =useSelector(state=>state.style);
    let styler;

    if(hover){
        styler = {
            color:style.nav,
            backgroundColor:style.navText
        };
    }else{
        styler = {
            color:style.navText,
            backgroundColor:style.nav
        };
    }

    const hoverChange = ()=>{
        setHover(!hover)
    };


    return (
        <div className={"button"} style={styler} onClick={props.handleClick.bind(this)} onMouseEnter={hoverChange}
             onMouseLeave={hoverChange} >
            {props.text}
        </div>
    )
}



export default Button;