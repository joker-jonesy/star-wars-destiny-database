import React from 'react';
import {setName} from "../../redux/actions/setActions";
import {connect} from 'react-redux';

function Search(props) {

    const handleChange = event => {
        props.setName(event.target.value);

    };

    let sty = {
        backgroundColor: props.style.navText,
        color: props.style.nav
    };

    return (
        <input style={sty} placeholder={"Search Card by Name..."} value={props.name} onChange={handleChange}
               className={"search"}/>

    );
}

const mapStateToProps = (state) => {
    return {
        name: state.name,
        style: state.style
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
