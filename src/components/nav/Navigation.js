import React from 'react';
import {toggleOptions} from "../../redux/actions/setActions";
import {connect} from 'react-redux';

import Search from '../input/Search';
import Logo from '../../assets/logo.png';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';

function Nav(props) {

    return (


        <nav>
            <Link className={"logo"} to={"/"}><img alt={"logo"} src={Logo}/></Link>
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
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
