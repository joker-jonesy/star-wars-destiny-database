import React from 'react';
import {setName} from "../../redux/actions/setActions";
import { useSelector, useDispatch } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

function Search(props) {


    const style =useSelector(state=>state.style);

    const name =useSelector(state=>state.name);
    const dispatch = useDispatch();

    const handleChange = event => {
        dispatch(setName(event.target.value));
    };


    let sty = {
        backgroundColor: style.navText,
        color: style.nav,

    };

    let sg = {
        color: style.nav
    };

    let close = (name!==""?<FontAwesomeIcon style={sg} icon={faTimes} onClick={()=>dispatch(setName(""))}/>:null);

    return (
        <div className={"searchContainer"}>
            <input style={sty} placeholder={"Search Card by Name..."} value={name} onChange={handleChange}
                   className={"search "+style.name}/>
            {close}
        </div>

    );
}





export default Search;
