import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';
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

    return (
        <div className={"card"} >
            <h1>{props.name}</h1>
            <div className={"cardWrapper"}>
                {rend.img && <img alt={props.name} onLoad={handleImageLoad} onError={handleImageError} src={props.imagesrc}/>}
                <div>
                    {rend.load&&<FontAwesomeIcon icon={faSpinner} spin size={"lg"} style={{color:props.loadColor}}/>}
                    {rend.error&&<FontAwesomeIcon icon={faExclamationCircle} style={{color:"red"}} size={"6x"}/>}
                </div>
            </div>


        </div>
    )
}

export default Card;