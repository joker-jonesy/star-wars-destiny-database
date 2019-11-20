import React from 'react';

function Side(props){

    let finished;;

    if(props.sd.includes("RD")){
        finished = "<span class='sd'>"+props.sd[0]+" <span class='icon icon-ranged '></span></span>";
    }else if(props.sd.includes("Sh")){
        finished = "<span class='sd'>"+props.sd[0]+" <span class='icon icon-shield '></span></span>";
    }else if(props.sd.includes("MD")){
        finished = "<span class='sd'>"+props.sd[0]+" <span class='icon icon-melee '></span></span>";
    }else if(props.sd.includes("ID")){
        finished = "<span class='sd'>"+props.sd[0]+" <span class='icon icon-indirect '></span></span>";
    }else if(props.sd.includes("Dc")){
        finished = "<span class='sd'>"+props.sd[0]+" <span class='icon icon-discard '></span></span>";
    }else if(props.sd.includes("Dr")){
        finished = "<span class='sd'>"+props.sd[0]+" <span class='icon icon-disrupt '></span></span>";
    }else if(props.sd.includes("Sp")){
        finished = "<span class='sd'>"+props.sd[0]+" <span class='icon icon-special '></span></span>";
    }else if(props.sd.includes("R")){
        finished = "<span class='sd'>"+props.sd[0]+" <span class='icon icon-resource '></span></span>";
    }else{
        finished = "<span class='blank'>-</span>"
    }

    if(!isNaN(props.sd[props.sd.length-1])&&props.sd[props.sd.length-1]!=="-"){
        finished = finished+"<span class='res'> "+props.sd[props.sd.length-1]+" <span class='icon" +
            " icon-resource res'></span></span>"
    }




    return(
        <div className={"side"} dangerouslySetInnerHTML={{ __html: finished }}></div>
    )
}

export default Side