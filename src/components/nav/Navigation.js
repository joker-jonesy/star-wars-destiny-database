import React from 'react';
import {toggleOptions, clearOptions} from "../../redux/actions/setActions";
import {connect} from 'react-redux';

import Search from '../input/Search';
import Logo from '../../assets/logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';

function Nav(props) {

    return (


        <nav>
            <div className={"logo"} onClick={()=>props.clearOptions()}><img alt={"logo"} src={Logo}/></div>
            <Search/>
            <div className={"ham"} onClick={() => props.toggleOptions()}>

                {!props.options && <FontAwesomeIcon icon={faSearch} size="2x"/>}
                {props.options && <FontAwesomeIcon icon={faTimes} size="2x"/>}
            </div>

        </nav>


    );
}


const mapStateToProps = (state) => {
    return {
        options: state.options
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleOptions: () => {
            dispatch(toggleOptions())
        },
        clearOptions:()=>{
            dispatch(clearOptions())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
