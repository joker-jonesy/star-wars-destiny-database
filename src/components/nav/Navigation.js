import React from 'react';
import {toggleOptions, clearOptions, toggleStyles} from "../../redux/actions/setActions";
import {connect} from 'react-redux';
import Search from '../input/Search';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes, faPalette} from '@fortawesome/free-solid-svg-icons';

function Nav(props) {

    let style= {
        color:props.style.navText,
        backgroundColor:props.style.nav
    };

    return (


        <nav style={style}>
            <div className={"logo"} >
                <img alt={"logo"} src={require("./../../assets/"+props.style.name.toLowerCase()+"logo.svg")} onClick={()=>props.clearOptions()}/>
            </div>
            <Search/>
            <div className={"ham"} >

                {!props.styles && <FontAwesomeIcon icon={faPalette} size="2x" onClick={() => props.toggleStyles()}/>}
                {props.styles && <FontAwesomeIcon icon={faTimes} size="2x" onClick={() => props.toggleStyles()}/>}

                {!props.options && <FontAwesomeIcon icon={faSearch} size="2x" onClick={() => props.toggleOptions()}/>}
                {props.options && <FontAwesomeIcon icon={faTimes} size="2x" onClick={() => props.toggleOptions()}/>}

            </div>

        </nav>


    );
}


const mapStateToProps = (state) => {
    return {
        options: state.options,
        styles:state.styles,
        style:state.style
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleOptions: () => {
            dispatch(toggleOptions())
        },
        clearOptions:()=>{
            dispatch(clearOptions())
        },
        toggleStyles: ()=>{
            dispatch(toggleStyles())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
