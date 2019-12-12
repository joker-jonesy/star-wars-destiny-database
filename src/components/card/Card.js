import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner, faExclamationCircle, faCircle} from '@fortawesome/free-solid-svg-icons';
import {connect} from "react-redux";
function Card(props) {

    const [load, updateLoading] = React.useState("loading");
    const [rend, rendElement] = React.useState({
        img:false,
        load:true,
        error:false
    });
    const [seconds, setSeconds] = React.useState(0);


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

    if(props.style===""){
        imgStyle = {
            color:"black"
        };
    }else{
        imgStyle = {
            color:props.style.bodyText
        };
    }


    return (
        <div className={"card"}>
            {props.bod&&rend.error?<h1 style={{color:props.style.bodyText}}>{props.name}</h1>:null}
            <div className={"cardWrapper"}>
                {rend.img && <img alt={props.name} onLoad={handleImageLoad} onError={handleImageError} src={props.imagesrc} style={imgStyle}/>}

                    {rend.load&&<FontAwesomeIcon icon={faSpinner} spin size={"lg"} style={{color:props.loadColor}}/>}
                    {rend.error&&<div className={"errorBox"}><h4 style={{color:(props.bod?props.style.bodyText:'white')}}>Error Loading Image</h4><div className="fa-layers fa-fw"><FontAwesomeIcon style={{color:"white"}} icon={faCircle} size={"6x"} /><FontAwesomeIcon icon={faExclamationCircle} style={{color:"red"}} size={"6x"}/></div></div>}

            </div>


        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        style:state.style
    }
};

export default connect(mapStateToProps)(Card);
