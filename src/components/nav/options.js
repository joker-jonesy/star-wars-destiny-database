import React from 'react';
import {connect} from 'react-redux';
import Option from './Option';
import {Sort} from "../../data/Sort";

function Options(props){

    let show;

    if(props.options){
        show={
            "right":"0"
        }
    }else{
        show={
            "right":"-100%"
        }
    }

    let options = Sort.map((srt, idx)=>
        <Option key={idx} opt={srt}/>
    );


    return (
        <div className={"options"} style={show}>
            <h1>Sort Cards</h1>
            <div className={"wrapper"}>
                {options}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        options:state.options
    }
};



export default connect(mapStateToProps)(Options);
