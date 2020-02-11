import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner, faExclamationCircle, faCircle} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
function Card(props) {

    const [load, updateLoading] = React.useState("loading");
    const [rend, rendElement] = React.useState({
        img:false,
        load:true,
        error:false
    });
    const [seconds, setSeconds] = React.useState(0);
    const style =useSelector(state=>state.style);

    React.useEffect(() => {
        let interval = null;

            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                if (load) {
                    if(props.imagesrc===null){
                        rendElement({
                            img:false,
                            load:false,
                            error:true
                        });
                    }else{
                        rendElement({
                            img:true,
                            load:false,
                            error:false
                        });
                    }

                } else {
                    if(seconds>3){
                        rendElement({
                            img:false,
                            load:false,
                            error:true
                        });
                    }else{
                        rendElement({
                            img:false,
                            load:true,
                            error:false
                        });
                    }
                }
            }, 1000);

        return () => clearInterval(interval);
    }, [seconds, load, props.imagesrc]);

    const handleImageLoad = () => {
        updateLoading(true)
    };

    const handleImageError = () => {
        updateLoading(false)
    };

    let imgStyle;

    if(style===""){
        imgStyle = {
            color:"black"
        };
    }else{
        imgStyle = {
            color:style.bodyText
        };
    }


    return (
        <div className={"card"}>
            {props.bod&&rend.error?<h1 style={{color:style.bodyText}}>{props.name}</h1>:null}
            <div className={"cardWrapper"}>
                {rend.img && <img alt={props.name} onLoad={handleImageLoad} onError={handleImageError} src={props.imagesrc} style={imgStyle}/>}

                    {rend.load&&<FontAwesomeIcon icon={faSpinner} spin size={"lg"} style={{color:props.loadColor}}/>}
                    {rend.error&&<div className={"errorBox"}><h4 style={{color:(props.bod?style.bodyText:'white')}}>Error Loading Image</h4><div className="fa-layers fa-fw"><FontAwesomeIcon style={{color:"white"}} icon={faCircle} size={"6x"} /><FontAwesomeIcon icon={faExclamationCircle} style={{color:"red"}} size={"6x"}/></div></div>}

            </div>


        </div>
    )
}


export default Card;
