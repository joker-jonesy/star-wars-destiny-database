import React from 'react';
import {setName} from "../../redux/actions/setActions";
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

function Search(props) {

    const handleChange = event => {
        props.setName(event.target.value);

    };

    let sty = {
        backgroundColor: props.style.navText,
        color: props.style.nav
    };

    let sg  ={
        color: props.style.nav
    };

    return (
        <div className={"searchContainer"}>
            <input style={sty} placeholder={"Search Card by Name..."} value={props.name} onChange={handleChange}
               className={"search"}/>
               <FontAwesomeIcon style={sg} icon={faTimes} onClick={()=> props.setName("")}/>
        </div>

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
