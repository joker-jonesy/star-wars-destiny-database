import React from 'react';
import {setName} from "../../redux/actions/setActions";
import {connect} from 'react-redux';

function Search(props) {

    const [text, setText] = React.useState("");


    const handleChange = event => {
        setText(event.target.value);
        props.setName(text);
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
