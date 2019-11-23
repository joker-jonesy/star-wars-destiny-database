import React from 'react';
import {connect} from 'react-redux';

function Button(props){

    let style = {
        color:props.style.navText,
        backgroundColor:props.style.nav
    };

    return (
        <div className={"button"} style={style} onClick={props.handleClick.bind(this)} >
            {props.text}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        style:state.style
    }
};

export default connect(mapStateToProps)(Button);