import React from 'react';

function CardInfo(props){

    const [rst, setRst] = React.useState([

       {
           format:"trilogy",
           restricted:false,
            balance:"--",
            legal:false
        },
        {
            format:"standard",
            restricted:false,
            balance:"--",
            legal:false
        },
        {
            format:"infinite",
            restricted:false,
            balance:"--",
            legal:true
        }
    ]);
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

        const abortController = new AbortController();
        const signal  =abortController.signal;


        function handleStatusChange(status) {
            setRst(status);
        }

        const unsubscribe = ()=>{

            fetch("https://swdestinydb.com/api/public/formats/", {signal:signal})
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    let formats=[];

                     data.map((fm)=>{

                        let format ={
                            name:fm.name,
                            restricted:false,
                            balance:"--",
                            legal:false
                        };

                        if(props.code in fm.data.balance){
                            format.balance = fm.data.balance[props.code];
                        }

                        if(fm.data.restricted.includes(props.code)){
                            format.restricted=true;
                        }

                        if(fm.data.sets.includes(props.crd.set_code)){
                            format.legal=true;
                        }


                        formats.push(format);



                    });

                    handleStatusChange(formats);
                }).catch(()=> console.log())
        };

        unsubscribe();


        return function cleanup(){
            unsubscribe();
            abortController.abort();
        };
    },[]);

    let formats = rst.map((fm, idx)=>
    <div key={idx}>
        <h1>{fm.name}</h1>
        <h3>{fm.restricted ? "Restricted":null}</h3>
        <h3>{fm.balance}</h3>
        <h6>Legal: {fm.legal ? "Playable":"Unplayable"}</h6>
    </div>
    );


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
            {formats}
            <p>{props.crd.text}</p>

            <i>{props.crd.flavor}</i>

            <div>{props.crd.affiliation_name}</div>
            <div>{props.crd.rarity_name}</div>

            <div>{props.crd.set_name}: {props.crd.position}</div>


        </div>
    )
}

export default CardInfo