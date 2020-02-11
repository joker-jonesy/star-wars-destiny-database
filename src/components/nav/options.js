import React from 'react';
import {clearOptions} from "../../redux/actions/setActions";
import {connect} from 'react-redux';
import { useDispatch, useSelector } from "react-redux";
import Option from './Option';
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

    let Sets = [];

    for(let i=0; i<props.sets.length; i++){
        Sets.push(props.sets[i].name)
    }

    let Sort = [

        {
            name: "Affiliations",
            type: "affiliation_code",
            values:["hero", "villain", "neutral"]
        },
        {
            name: "Colors",
            type: "faction_code",
            values:["red", "blue", "yellow", "gray"]
        },
        {
            name: "Rarity",
            type: "rarity_name",
            values:["Starter", "Common", "Uncommon", "Rare", "Legendary"]
        },
        {
            name:"Health",
            type:"health",
            values:[4,5,6,7,8,9,10,11,12,13,14,15]
        },
        {
            name:"Cost",
            type:"cost",
            values:[0,1,2,3,4,5,6]
        },
        {
            name:"Set",
            type:"set_name",
            values:Sets},
        {
            name:"Points",
            type:"points",
            values:["4","5","6","7","8","9","10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"]
        },
        {
            name:"Type",
            type:"type_code",
            values:["character", "upgrade", "support", "event", "downgrade", "plot"]
        },
        {
            name:"Dice Sides",
            type:"sides",
            values:["RD", "Sh","MD", "ID", "Dc","Dr", "F", "R", "Sp","-","+"]

        },
        {
            name:"Formats",
            type:"formats",
            values:["Standard", "Trilogy", "Infinite"]
        },
        {
            name: "Restricted",
            type:"restricted",
            values:["restricted"]
        },
        {
            name: "Balanced",
            type:"balanced",
            values:["balanced"]
        },
        {
            name: "Keywords",
            type:"keywords",
            values:["Guardian", "Ambush", "Redeploy"]
        }

    ];


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
        style:state.style,
        sets:state.sets
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
