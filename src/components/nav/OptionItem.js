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
        if (isNaN(props.value)) {
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