import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import OptionItem from './OptionItem';
import {useSelector } from "react-redux";

function Option (props){
    const [drop, toggleDrop] = React.useState(false);
    const style =useSelector(state=>state.style);

    let shower;

    if(drop){
        shower={
            "minHeight":""+(25*props.opt.values.length)+"px",
            "maxHeight":""+(25*props.opt.values.length)+"px"
        }
    }else{
        shower={
            "minHeight":"0px",
            "maxHeight":"0px"
        }
    }

    let values = props.opt.values.map((op, idx)=> {
        return <OptionItem key={idx} type={props.opt.type} value={op}/>
    });

    return(
        <div className={"option"}>
            <h3 className={"optHead"} style={{color:style.nav}} onClick={()=>toggleDrop(!drop)}>
                {props.opt.name}
                {!drop && <FontAwesomeIcon icon={faChevronDown} />}
                {drop && <FontAwesomeIcon icon={faChevronUp} />}
            </h3>
            <div className={"listOpt"} style={shower}>
                {values}
            </div>
        </div>
    );

}



export default Option;