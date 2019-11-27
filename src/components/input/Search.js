import React from 'react';
import {setName} from "../../redux/actions/setActions";
import {connect} from 'react-redux';

function Search(props) {

    const handleChange = event => {
        props.setName(event.target.value);

    };

    return (
        <input placeholder={"Search for a Card by Name..."} value={props.name} onChange={handleChange} className={"search"}/>

    );
}

const mapStateToProps = (state) => {
    return {
        name:state.name
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
