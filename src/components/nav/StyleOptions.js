import React from 'react';
import StyleOption from './StyleOption';
import {connect} from "react-redux";
import {Styles} from './../../data/Style';

function StyleOptions(props) {

    let show;

    if (props.styles) {
        show={
            "right":"0",
            backgroundColor:props.style.navText,
            color:props.style.nav
        }
    }else{
        show={
            "right":"-100%",
            backgroundColor:props.style.navText,
            color:props.style.nav
        }
    }

    let styles = Styles.map((srt, idx) =>
        <StyleOption key={idx} opt={srt}/>
    );


    return (
        <div className={"navOptions"} style={show}>
            <div className={"top"}><h1 style={{color:props.style.nav}}>Change Style</h1></div>
            <div className={"wrapper"}>
                {styles}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        styles: state.styles,
        style: state.style
    }
};



export default connect(mapStateToProps)(StyleOptions);

