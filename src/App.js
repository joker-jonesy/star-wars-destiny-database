import React from 'react';
import './less/style.css';
import List from './components/main/List';
import CardPage from './components/card/CardPage';
import About from './components/main/About';
import Nav from './components/nav/Navigation';
import Footer from './components/footer/Footer';
import Options from './components/nav/options';
import SortNav from './components/nav/SortNav'
import StyleOptions from './components/nav/StyleOptions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner, faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from "react-redux";
import {setCards, setFormats, setSets} from "./redux/actions/setActions";

import {
    Switch,
    Route
} from "react-router-dom";



function App() {

    const [show, updateShow] = React.useState(false);
    const [seconds, setSeconds] = React.useState(0);
    const [pad, setPad] = React.useState(60);
    const [loadCard, setLoadCards] = React.useState("load");
    const [loadFormat, setLoadFormat] = React.useState("load");
    const [loadSet, setLoadSet] = React.useState("load");
    const [load, setLoad] =React.useState("load");

    const style =useSelector(state=>state.style);
    const sorted =useSelector(state=>state.sorted);
    const dispatch = useDispatch();


    React.useEffect(() => {
        localStorage.setItem('localStyle', JSON.stringify(style));
        if(load==="load"){
            fetch("https://swdestinydb.com/api/public/cards/")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    setLoadCards("loaded");
                    dispatch(setCards(data));
                }).catch(function () {
                setLoadCards("error");
            });
            fetch("https://swdestinydb.com/api/public/formats/")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    setLoadFormat("loaded");
                    dispatch(setFormats(data));
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
                    dispatch(setSets(data));
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

        for (let p in sorted) {
            if (sorted[p].toggle) {
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

            document.documentElement.style.backgroundColor = style.body;
        }


        return () => clearInterval(interval);

    }, [style, sorted, seconds, loadCard, loadFormat, loadSet, load, dispatch]);

    let appStyle = {
        backgroundColor: style.body
    };

    let wrapStyle = {
        color: style.bodyText,
        backgroundColor: style.body,
        paddingTop: (show ? "" + pad + "px" : "0")
    };

    return (

        <div className="App" style={appStyle}>
            {load==="loaded"&&<span><Nav/> <SortNav/> <Options/> <StyleOptions/> <div className={"mainWrapper"} style={wrapStyle}><Switch><Route path="/" component={List}/></Switch></div><Route path={"/card/:id"} component={CardPage}/><Route exact path={"/about"} component={About}/></span>}
            {load==="load"&&<div style={{height:"100%"}}><FontAwesomeIcon icon={faSpinner} spin size={"lg"} style={{color:style.bodyText}}/></div>}
            {load==="error"&&<div style={{height:"100%"}}><FontAwesomeIcon icon={faExclamationCircle} spin size={"lg"} style={{color:style.bodyText}}/><h1>Error Loading Card API. Try again later</h1></div>}
            {load==="loaded"&&<Footer/>}
        </div>
    );
}




export default App;
