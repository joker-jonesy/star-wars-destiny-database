import React from 'react';
import {setSort} from "../../redux/actions/setActions";
import { useDispatch, useSelector } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare, faSquare} from '@fortawesome/free-solid-svg-icons';


function OptionItem(props) {

    const [hover, setHover] = React.useState(false)
    const style =useSelector(state=>state.style);
    const sorted =useSelector(state=>state.sorted);
    const dispatch = useDispatch();


    const hoverChange = ()=>{
        setHover(!hover)
    };



    let shower;

    const handleSort = (prop, val) => {
        dispatch(setSort(prop,  val));
    };

    if(hover){
        if(style.navText===undefined){
            shower = {
                backgroundColor: '#343740',
                color:'white'
            }
        }else{
            shower = {
                backgroundColor: style.bodyText,
                color:style.navText
            }
        }
    }else{
        if (sorted[props.type].val.includes(props.value) && sorted[props.type].toggle) {
            if(style.navText===undefined){
                shower = {
                    backgroundColor: 'black',
                    color:'white'
                }
            }else{
                shower = {
                    backgroundColor: style.navText,
                    color:style.nav
                }
            }

        }else{
            if(style.navText===undefined){
                shower = {
                    backgroundColor: 'white',
                    color:'black'
                }
            }else{
                shower = {
                    backgroundColor: style.nav,
                    color:style.navText
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
             onMouseLeave={hoverChange} style={shower} onClick={() => handleSort(props.type, props.value)}>{sorted[props.type].val.includes(props.value) && sorted[props.type].toggle ? <FontAwesomeIcon icon={faCheckSquare}/> :<FontAwesomeIcon icon={faSquare}/>} {numberCheck()}</div>
    );

}






export default OptionItem;