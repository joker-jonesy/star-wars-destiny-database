import React from 'react';
import {useHistory,
    useParams
} from "react-router-dom";
import Card from './Card';
import CardInfo from './CardInfo';

function CardPage(){

    const [card,setCard] = React.useState("");
    const [load, updateLoading] = React.useState("loading");

    let history = useHistory();

    let back = e => {
        e.stopPropagation();
        history.goBack();
    };

    const handleImageLoad = ()=>{
        updateLoading("loaded")
    };

    const handleImageError = ()=>{
        updateLoading("error")
    };

    let loadDisplay =()=>{
        if(load==="loading"){
            return "Loading Image..."
        }else if(load==="error"){
            return "Image Error";
        }else{
            return ""
        }
    };

    let { id } = useParams();
    console.log(id);


    React.useEffect(()=>{


        function handleStatusChange(status) {
            setCard(status)
        }

        const unsubscribe = ()=>{


            fetch("https://swdestinydb.com/api/public/cards/")
                .then(response => {
                    return response.json();
                })
                .then((data) => {

                    let cardMain = data.filter(crd=>{
                        return id===crd.code;
                    });

                    handleStatusChange(cardMain[0]);
                })
        };

        unsubscribe();


        return ()=>unsubscribe();
    },[id]);

    return (
        <div className={id ? "cardPageWrapper" : undefined} onClick={back}>
            <Card  name={card.name} imagesrc={card.imagesrc} code={card.code} loadColor={"white"}/>
            <CardInfo crd={card}/>
        </div>
    )
}

export default CardPage;