import React from 'react';
import './less/style.css';
import List from './components/main/List';
import CardPage from './components/card/CardPage'
import Nav from './components/nav/Navigation';
import Options from './components/nav/options';
import SortNav from './components/nav/SortNav'
import StyleOptions from './components/nav/StyleOptions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

import {connect} from 'react-redux';
import {setCards, setFormats, setSets} from "./redux/actions/setActions";

import {
    Switch,
    Route
} from "react-router-dom";



function App(props) {

    const [show, updateShow] = React.useState(false);
    const [seconds, setSeconds] = React.useState(0);
    const [pad, setPad] = React.useState(60);
    const [loadCard, setLoadCards] = React.useState("load");
    const [loadFormat, setLoadFormat] = React.useState("load");
    const [loadSet, setLoadSet] = React.useState("load");
    const [load, setLoad] =React.useState("load");


    React.useEffect(() => {
        localStorage.setItem('localStyle', JSON.stringify(props.style));
        if(load==="load"){
            fetch("https://swdestinydb.com/api/public/cards/")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    setLoadCards("loaded");
                    props.setCards(data);
                }).catch(function () {
                setLoadCards("error");
            });
            fetch("https://swdestinydb.com/api/public/formats/")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    setLoadFormat("loaded");
                    props.setFormats(data);
                }).catch(function () {
                setLoadFormat("error");
            });
            //
            fetch("https://swdestinydb.com/api/public/sets/")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    setLoadSet("loaded");
                    props.setSets(data);
                }).catch(function () {
                setLoadSet("error");
            });
        }


        if(loadCard==="loaded"&&loadFormat==="loaded"&&loadSet==="loaded"){
            setLoad("loaded")
        }else if(loadCard==="error"||loadFormat==="error"||loadSet==="error"){
            setLoad("error");
        }

        let check = false;

        for (let p in props.sorted) {
            if (props.sorted[p].toggle) {
                check = true;
            }
        }

        updateShow(check);

        let interval = null;

        interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 500);

        if(load==="loaded"){
            setPad(document.querySelector(".sortNav").getBoundingClientRect().height);

            document.documentElement.style.backgroundColor = props.style.body;
        }


        return () => clearInterval(interval);

    }, [props.style, props.sorted, seconds, loadCard, loadFormat, loadSet, load, props]);

    let appStyle = {
        backgroundColor: props.style.body
    };

    let wrapStyle = {
        color: props.style.bodyText,
        backgroundColor: props.style.body,
        paddingTop: (show ? "" + pad + "px" : "0")
    };

    return (

        <div className="App" style={appStyle}>
            {load==="loaded"&&<span><Nav/> <SortNav/> <Options/> <StyleOptions/> <div className={"mainWrapper"} style={wrapStyle}><Switch><Route path="/" component={List}/></Switch></div><Route path={"/:id"} component={CardPage}/></span>}
            {load==="load"&&<div style={{height:"100%"}}><FontAwesomeIcon icon={faSpinner} spin size={"lg"} style={{color:props.style.bodyText}}/></div>}
            {load==="error"&&<div style={{height:"100%"}}><FontAwesomeIcon icon={faExclamationCircle} spin size={"lg"} style={{color:props.style.bodyText}}/><h1>Error Loading Card API. Try again later</h1></div>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        style: state.style,
        sorted: state.sorted
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCards: (crds) => {
            dispatch(setCards(crds))
        },
        setFormats: (fmts) => {
            dispatch(setFormats(fmts))
        },
        setSets: (sts) => {
            dispatch(setSets(sts))
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
