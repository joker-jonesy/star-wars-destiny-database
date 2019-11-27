import React from 'react';
import {setStyles} from "../../redux/actions/setActions";
import {connect} from "react-redux";

function StyleOption(props) {

    const [hover, setHover] = React.useState(false)

    const hoverChange = ()=>{
        setHover(!hover)
    };

    let active;

    if(hover){
        if(props.style.navText===undefined){
            active = {
                backgroundColor: '#343740',
                color:'white'
            }
        }else{
            active = {
                backgroundColor: props.style.bodyText,
                color:props.style.navText
            }
        }
    }else{
        if(props.opt.name===props.style.name){
            active={
                backgroundColor:props.style.navText,
                color:props.style.nav
            }
        }else{
            active={
                backgroundColor:props.style.nav,
                color:props.style.navText
            }
        }
    }





    return (

        <div className={"item"} onMouseEnter={hoverChange} onMouseLeave={hoverChange} style={active} onClick={() => props.setStyles(props.opt)}>{props.opt.name}</div>

    )
}

const mapStateToProps = (state) => {
    return {
        style: state.style
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStyles: (style) => {
            dispatch(setStyles(style))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StyleOption);