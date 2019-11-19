import React from 'react';

function Loader(props){

    let show;

    if(props.show){
        show={
            "show":"inline-block"
        }
    }else{
        show={
            "show":"none"
        }
    }

    return(<div className="lds-roller" style={show}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>);
}

export default Loader;