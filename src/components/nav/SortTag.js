import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faCircle, faTimes} from '@fortawesome/free-solid-svg-icons';

import {connect} from 'react-redux';
import {setSort} from "../../redux/actions/setActions";

function SortTag(props){
    const [hover, setHover] = React.useState(false);


    const handleSort = (prop, val) => {
        props.setSort(prop, val)
    };

    let style;

    if(hover){
        style = {
            color:props.style.body,
            backgroundColor:props.style.nav
        };
    }else{
        style = {
            color:props.style.nav,
            backgroundColor:props.style.body
        };
    }

    const hoverChange = ()=>{
        setHover(!hover)
    };

    const numberCheck = (vl) => {
        if(vl==="RD"){
            return <span><span className='icon icon-ranged'></span> Ranged</span>
        }else if(vl==="Sh"){
            return <span><span className='icon icon-shield'></span> Shield</span>
        }else if(vl==="MD"){
            return <span><span className='icon icon-melee'></span> Melee</span>
        }else if(vl==="ID"){
            return <span><span className='icon icon-indirect'></span> Indirect</span>
        }else if(vl==="Dc"){
            return <span><span className='icon icon-discard'></span> Discard</span>
        }else if(vl==="Dr"){
            return <span><span className='icon icon-disrupt'></span> Disrupt</span>
        }else if(vl==="F"){
            return <span><span className='icon icon-focus'></span> Focus</span>
        }else if(vl==="Sp"){
            return <span><span className='icon icon-special'></span> Special</span>
        }else if(vl==="R"){
            return <span><span className='icon icon-resource'></span> Special</span>
        }else if(vl==="-"){
            return <span><span className='icon icon-blank'></span> Blank</span>
        }else if(vl==="+"){
            return <span>Modified</span>
        }else if(vl.includes("H")){
            return <span><FontAwesomeIcon icon={faHeart}/> {vl.substring(0, vl.length - 1)}</span>
        }else if(vl.includes("P")){
            return <span><FontAwesomeIcon icon={faCircle}/> {vl.substring(0, vl.length - 1)}</span>
        }else if(vl.includes("C")){
            return <span><span className='icon icon-resource '></span> {vl.substring(0, vl.length - 1)}</span>
        }else if (isNaN(vl)) {
            return vl.charAt(0).toUpperCase() + vl.substring(1)
        } else {
            return vl
        }
    };

    let text = (vl)=>{
        if(vl.includes("H")){
            return Number(vl.substring(0, vl.length - 1));
        }else if(vl.includes("P")){
            return vl.substring(0, vl.length - 1)
        }else if(vl.includes("C")){
            return Number(vl.substring(0, vl.length - 1));
        }else{
            return vl
        }
    };

    return (
        <div className={"itm"} onClick={()=>handleSort(props.prp,text(props.val))} style={style} onMouseEnter={hoverChange}
             onMouseLeave={hoverChange}>{numberCheck(props.val)} <FontAwesomeIcon icon={faTimes}/></div>
    )
}

const mapStateToProps = (state) => {
    return {
        sorted: state.sorted,
        style: state.style
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSort: (prop, val) => {
            dispatch(setSort(prop,  val))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SortTag);