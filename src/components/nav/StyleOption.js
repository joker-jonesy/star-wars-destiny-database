import React from 'react';
import {setStyles} from "../../redux/actions/setActions";
import {connect} from "react-redux";

function StyleOption(props) {

    let active;

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



    return (

        <div className={"item"} style={active} onClick={() => props.setStyles(props.opt)}>{props.opt.name}</div>

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