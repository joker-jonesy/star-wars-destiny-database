import React from 'react';

function Side(props){

    let finished;

    function setVal (){
        if(props.sd.includes("+")){
            return "+ "+props.sd[1];
        }else if(props.sd.includes("Sp")){
            return "";
        }else{
            return props.sd[0];
        }
    }

    function setClass(){
        if(props.sd.includes("+")){
            return true
        }else{
            return false
        }
    }


    if(props.sd.includes("RD")){
        if(setClass()){
            finished = "<span class='sd modify'>"+setVal ()+" <span class='icon icon-ranged '></span></span>";
        }else{
            finished = "<span class='sd'>"+setVal ()+" <span class='icon icon-ranged '></span></span>";
        }

    }else if(props.sd.includes("Sh")){
        if(setClass()){
            finished = "<span class='sd modify'>"+setVal ()+" <span class='icon icon-shield '></span></span>";
        }else{
            finished = "<span class='sd'>"+setVal ()+" <span class='icon icon-shield '></span></span>";
        }

    }else if(props.sd.includes("MD")){
        if(setClass()){
            finished = "<span class='sd modify'>"+setVal ()+" <span class='icon icon-melee '></span></span>";
        }else{
            finished = "<span class='sd'>"+setVal ()+" <span class='icon icon-melee '></span></span>";
        }

    }else if(props.sd.includes("ID")){
        if(setClass()){
            finished = "<span class='sd modify'>"+setVal ()+" <span class='icon icon-indirect '></span></span>";
        }else{
            finished = "<span class='sd'>"+setVal ()+" <span class='icon icon-indirect '></span></span>";
        }

    }else if(props.sd.includes("Dc")){
        if(setClass()){
            finished = "<span class='sd modify'>"+setVal ()+" <span class='icon icon-discard '></span></span>";
        }else{
            finished = "<span class='sd'>"+setVal ()+" <span class='icon icon-discard '></span></span>";
        }

    }else if(props.sd.includes("Dr")){
        if(setClass()){
            finished = "<span class='sd modify'>"+setVal ()+" <span class='icon icon-disrupt '></span></span>";
        }else{
            finished = "<span class='sd'>"+setVal ()+" <span class='icon icon-disrupt '></span></span>";
        }

    }else if(props.sd.includes("F")){
        if(setClass()){
            finished = "<span class='sd modify'>"+setVal ()+" <span class='icon icon-focus '></span></span>";
        }else{
            finished = "<span class='sd'>"+setVal ()+" <span class='icon icon-focus '></span></span>";
        }

    }else if(props.sd.includes("Sp")){
        finished = "<span class='sd'>"+setVal ()+" <span class='icon icon-special '></span></span>";
    }else if(props.sd.includes("R")){
        if(setClass()){
            finished = "<span class='sd modify'>"+setVal ()+" <span class='icon icon-resource '></span></span>";
        }else{
            finished = "<span class='sd'>"+setVal ()+" <span class='icon icon-resource '></span></span>";
        }

    }else{
        finished = "<span class='blank'>-</span>"
    }



    if(!isNaN(props.sd[props.sd.length-1])&&props.sd[props.sd.length-1]!=="-"){
        finished = finished+"<span class='res'> <span>"+props.sd[props.sd.length-1]+"</span> <span class='icon" +
            " icon-resource'></span></span>"
    }




    return(
        <div className={"side"} dangerouslySetInnerHTML={{ __html: finished }}></div>
    )
}

export default Side