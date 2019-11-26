import React from 'react';
import {setSort} from "../../redux/actions/setActions";
import {connect} from "react-redux";

function OptionItem(props) {

    let shower;

    const toggleReturn = (prop, val) => {
        return !(props.sorted[prop].toggle && props.sorted[prop].val === val);
    };

    const handleSort = (prop, val) => {
        props.setSort(prop, toggleReturn(prop, val), val)
    };

    if (props.sorted[props.type].val.includes(props.value) && props.sorted[props.type].toggle) {
        shower = {
            backgroundColor: props.style.navText,
            color:props.style.nav
        }
    }else{
        shower = {
            backgroundColor: props.style.nav,
            color:props.style.navText
        }
    }

    const numberCheck = () => {
        if(props.value==="RD"){
            return <span><span className='icon icon-ranged'></span> Ranged</span>
        }else if(props.value==="Sh"){
            return <span><span className='icon icon-shield'></span> Shield</span>
        }else if(props.value==="MD"){
            return <span><span className='icon icon-melee'></span> Melee</span>
        }else if(props.value==="ID"){
            return <span><span className='icon icon-indirect'></span> Indirect</span>
        }else if(props.value==="Dc"){
            return <span><span className='icon icon-discard'></span> Discard</span>
        }else if(props.value==="Dr"){
            return <span><span className='icon icon-disrupt'></span> Disrupt</span>
        }else if(props.value==="F"){
            return <span><span className='icon icon-focus'></span> Focus</span>
        }else if(props.value==="Sp"){
            return <span><span className='icon icon-special'></span> Special</span>
        }else if(props.value==="-"){
            return <span><span className='icon icon-blank'></span> Blank</span>
        }else if(props.value==="+"){
            return <span>Modified</span>
        }else if (isNaN(props.value)) {
            return props.value.charAt(0).toUpperCase() + props.value.substring(1)
        } else {
            return props.value
        }
    };


    return (
        <div className={"item"} style={shower} onClick={() => handleSort(props.type, props.value)}>{numberCheck()}</div>
    );

}

const mapStateToProps = (state) => {
    return {
        sorted: state.sorted,
        style:state.style
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSort: (prop, toggle, val) => {
            dispatch(setSort(prop, toggle, val))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(OptionItem);