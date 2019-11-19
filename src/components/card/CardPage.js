import React from 'react';
import {
     Link
} from "react-router-dom";
import Card from './Card';
import CardInfo from './CardInfo';

function CardPage(props){

    const [card,setCard] = React.useState("");


    React.useEffect(()=>{

        const abortController = new AbortController();
        const signal  =abortController.signal;


        function handleStatusChange(status) {
            setCard(status)
        }

        const unsubscribe = ()=>{


            fetch("https://swdestinydb.com/api/public/cards/", {signal:signal})
                .then(response => {
                    return response.json();
                })
                .then((data) => {

                    let cardMain = data.filter(crd=>{
                        return props.match.params.id===crd.code;
                    });

                    handleStatusChange(cardMain[0]);
                }).catch(ex=> console.log())
        };

        unsubscribe();


        return function cleanup(){
            unsubscribe();
            abortController.abort();
        };

    },[props.match.params.id]);

    return (
        <Link className={props.match.params.id ? "cardPageWrapper" : undefined} to={"/"}>
            <Card  name={card.name} imagesrc={card.imagesrc} code={card.code} loadColor={"white"}/>
            <CardInfo crd={card}/>
        </Link>
    )
}

export default CardPage;