import React from 'react';
import {connect} from 'react-redux';

function Button(props){

    const [hover, setHover] = React.useState(false)

    let style;

    if(hover){
        style = {
            color:props.style.nav,
            backgroundColor:props.style.navText
        };
    }else{
        style = {
            color:props.style.navText,
            backgroundColor:props.style.nav
        };
    }

    const hoverChange = ()=>{
        setHover(!hover)
    };


    return (
        <div className={"button"} style={style} onClick={props.handleClick.bind(this)} onMouseEnter={hoverChange}
             onMouseLeave={hoverChange} >
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