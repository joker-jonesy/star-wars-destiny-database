import React from 'react';
import {setSort} from "../../redux/actions/setActions";
import {connect} from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faSquare} from '@fortawesome/free-solid-svg-icons';


function OptionItem(props) {

    const [hover, setHover] = React.useState(false)

    const hoverChange = ()=>{
        setHover(!hover)
    };



    let shower;

    const handleSort = (prop, val) => {
        props.setSort(prop,  val)
    };

    if(hover){
        if(props.style.navText===undefined){
            shower = {
                backgroundColor: '#343740',
                color:'white'
            }
        }else{
            shower = {
                backgroundColor: props.style.bodyText,
                color:props.style.navText
            }
        }
    }else{
        if (props.sorted[props.type].val.includes(props.value) && props.sorted[props.type].toggle) {
            if(props.style.navText===undefined){
                shower = {
                    backgroundColor: 'black',
                    color:'white'
                }
            }else{
                shower = {
                    backgroundColor: props.style.navText,
                    color:props.style.nav
                }
            }

        }else{
            if(props.style.navText===undefined){
                shower = {
                    backgroundColor: 'white',
                    color:'black'
                }
            }else{
                shower = {
                    backgroundColor: props.style.nav,
                    color:props.style.navText
                }
            }
        }
    }



    const numberCheck = () => {
        if(props.value==="RD"){
            return <span><span className='icon icon-ranged'></span> Ranged</span>
        }else if(props.value==="Sh"){
            return <span><span className='icon icon-shield'></span> Shield</span>
        }else if(props.value==="MD"){
            return <span><span className='icon icon-melee'></span> Melee</span>
        }else if(props.value==="ID"){
            return <span><span className='icon icon-indirect'></span> Indirect</span>
        }else if(props.value==="Dc"){
            return <span><span className='icon icon-discard'></span> Discard</span>
        }else if(props.value==="Dr"){
            return <span><span className='icon icon-disrupt'></span> Disrupt</span>
        }else if(props.value==="F"){
            return <span><span className='icon icon-focus'></span> Focus</span>
        }else if(props.value==="Sp"){
            return <span><span className='icon icon-special'></span> Special</span>
        }else if(props.value==="R"){
            return <span><span className='icon icon-resource'></span> Resource</span>
        }else if(props.value==="-"){
            return <span><span className='icon icon-blank'></span> Blank</span>
        }else if(props.value==="+"){
            return <span>Modified</span>
        }else if (isNaN(props.value)) {
            return props.value.charAt(0).toUpperCase() + props.value.substring(1)
        } else {
            return props.value
        }
    };


    return (
        <div className={"item"} onMouseEnter={hoverChange}
             onMouseLeave={hoverChange} style={shower} onClick={() => handleSort(props.type, props.value)}>{props.sorted[props.type].val.includes(props.value) && props.sorted[props.type].toggle ? <FontAwesomeIcon icon={faCheckSquare}/> :<FontAwesomeIcon icon={faSquare}/>} {numberCheck()}</div>
    );

}

const mapStateToProps = (state) => {
    return {
        sorted: state.sorted,
        style:state.style
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSort: (prop, val) => {
            dispatch(setSort(prop, val))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(OptionItem);