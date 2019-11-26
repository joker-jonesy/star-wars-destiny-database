import React from 'react';
import {setName} from "../../redux/actions/setActions";
import {connect} from 'react-redux';

function Search(props) {

    const handleChange = event => {
        props.setName(event.target.value);

    };

    return (
        <input placeholder={"Search for a Card by Name..."} onChange={handleChange} className={"search"}/>

    );
}

const mapStateToProps = (state) => {
    return {
        displayedSet: state.displayedSet,
        itemLimit: state.itemLimit,
        setLimit: state.setLimit,
        sorted:state.sorted
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        setName: (name) => {
            dispatch(setName(name))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
