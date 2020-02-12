import React from 'react';
import {setStyles} from "../../redux/actions/setActions";
import { useDispatch, useSelector } from "react-redux";

function StyleOption(props) {

    const [hover, setHover] = React.useState(false)
    const style =useSelector(state=>state.style);
    const dispatch = useDispatch();


    const hoverChange = ()=>{
        setHover(!hover)
    };

    let active;

    if(hover){
        if(style.navText===undefined){
            active = {
                backgroundColor: '#343740',
                color:'white'
            }
        }else{
            active = {
                backgroundColor: style.bodyText,
                color:style.navText
            }
        }
    }else{
        if(props.opt.name===style.name){
            active={
                backgroundColor:style.navText,
                color:style.nav
            }
        }else{
            active={
                backgroundColor:style.nav,
                color:style.navText
            }
        }
    }





    return (

        <div className={"item"} onMouseEnter={hoverChange} onMouseLeave={hoverChange} style={active} onClick={() => dispatch(setStyles(props.opt))}>{props.opt.name}</div>

    )
}





export default StyleOption;