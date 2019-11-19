import React from 'react';

function CardInfo(props){

    const [rst, setRst] = React.useState({

        trilogy:{
            restricted:false,
            balance:"",
            legal:false
        },
        standard:{
            restricted:false,
            balance:"",
            legal:false
        },
        infinite:{
            restricted:false,
            balance:"",
            legal:true
        }
    });
    const [load, setLoad]= React.useState(false);


    let subtypes;
    let sides;

    if(props.crd.subtypes!==undefined){
       subtypes =props.crd.subtypes.map((sb, idx)=>
           <h3 key={idx}>{sb.name}{idx!==(props.crd.subtypes.length-1)&&"-"}</h3>
       );
    }

    if(props.crd.sides!==undefined){
        sides = props.crd.sides.map((sd, idx)=>
            <div key={idx} className={"side"}>{sd}</div>
        );
    }

    React.useEffect(()=>{


        function handleStatusChange(status) {

        }

        const unsubscribe = ()=>{


            fetch("https://swdestinydb.com/api/public/formats/")
                .then(response => {
                    return response.json();
                })
                .then((data) => {

                    let cardMain = data.filter(crd=>{

                    });

                    handleStatusChange(cardMain[0]);
                })
        };

        unsubscribe();


        return ()=>unsubscribe();
    },[]);


    return(
        <div className={"cardInfo"}>
            <h1>{props.crd.is_unique&&"◆ "}{props.crd.name}</h1>
            <h2>{props.crd.health&& "Health:"}{props.crd.health}</h2>
            <h2>{props.crd.cost&& "Cost:"}{props.crd.cost}</h2>
            <h2>{props.crd.points&& "Points:"}{props.crd.points}</h2>
            <h2>{props.crd.type_name}</h2>
            <div className={"subtypes"}>{subtypes}</div>
            <div className={"sides"}>{sides}</div>
            <h3>{props.crd.has_errata&&"This card has an errata"}</h3>
            <p>{props.crd.text}</p>

            <i>{props.crd.flavor}</i>

            <div>{props.crd.affiliation_name}</div>
            <div>{props.crd.rarity_name}</div>

            <div>{props.crd.set_name}: {props.crd.position}</div>


        </div>
    )
}

export default CardInfo