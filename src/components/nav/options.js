import React from 'react';
import {clearOptions} from "../../redux/actions/setActions";
import {connect} from 'react-redux';
import Option from './Option';
import {Sort} from "../../data/Sort";
import Button from '../input/Button';

function Options(props){

    let show;

    if(props.options){
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

    let options = Sort.map((srt, idx)=>
        <Option key={idx} opt={srt}/>
    );


    return (
        <div className={"options"} style={show}>
            <div className={"top"}><h1 style={{color:props.style.nav}}>Sort Cards </h1><Button handleClick={() => props.clearOptions()} text={"Clear Search Query"}/></div>
            <div className={"wrapper"}>
                {options}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        options:state.options,
        style:state.style
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        clearOptions:()=>{
            dispatch(clearOptions())
        }
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Options);
