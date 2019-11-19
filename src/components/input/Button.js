import React from 'react';

function Button(props){

    return (
        <div className={"button"} onClick={props.handleClick.bind(this)}>
            {props.text}
        </div>
    )
}

export default Button;