import React from 'react';
import {
    Link
} from "react-router-dom";
import Card from './Card';
import {connect} from 'react-redux';
import CardInfo from './CardInfo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner, faExclamationCircle, faTimes} from '@fortawesome/free-solid-svg-icons';


function CardPage(props) {

    const [card, setCard] = React.useState("");

    const [rend, rendElement] = React.useState({
        crd: false,
        load: true,
        error: false
    });


    React.useEffect(() => {

            const abortController = new AbortController();
            const signal = abortController.signal;

            function handleStatusChange(status) {
                rendElement({
                    crd: true,
                    load: false,
                    error: false
                });
                setCard(status)
            }


            fetch("https://swdestinydb.com/api/public/cards/", {signal: signal})
                .then(response => {
                    return response.json();
                })
                .then((data) => {

                    let cardMain = data.filter(crd => {
                        return props.match.params.id === crd.code;
                    });

                    handleStatusChange(cardMain[0]);
                }).catch(() => rendElement({
                crd: false,
                load: false,
                error: true
            }));


            return function cleanup() {
                abortController.abort();
            };

        }

        ,
        [props.match.params.id]
    )
    ;

    const code = card.code;


    return (
        <Link className={props.match.params.id ? "cardPageWrapper" : undefined} to={"/"}>

            <div className={"close"} style={{backgroundColor: props.style.navText, color: props.style.nav}}>
                <FontAwesomeIcon icon={faTimes} size={"4x"}/>
            </div>

            {rend.load && <FontAwesomeIcon icon={faSpinner} spin size={"lg"} style={{color: props.loadColor}}/>}
            {rend.error && <FontAwesomeIcon icon={faExclamationCircle} style={{color: "red"}} size={"6x"}/>}

            {rend.crd &&
            <Card name={card.name} bod={false} imagesrc={card.imagesrc} code={card.code} loadColor={"white"}/>}
            {code && <CardInfo crd={card} code={code}/>}

        </Link>
    )
}

const mapStateToProps = (state) => {
    return {
        style: state.style,
        cards:state.cards
    }
};

export default connect(mapStateToProps)(CardPage);