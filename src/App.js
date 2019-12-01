import React from 'react';
import './less/style.css';
import List from './components/main/List';
import CardPage from './components/card/CardPage'
import Nav from './components/nav/Navigation';
import Options from './components/nav/options';
import SortNav from './components/nav/SortNav'
import StyleOptions from './components/nav/StyleOptions';
import {connect} from 'react-redux';

import {
    Switch,
    Route
} from "react-router-dom";


function App(props) {

    const [style, setValue] = React.useState(
        JSON.parse(localStorage.getItem('localStyle')) || ''
    );
    const [show, updateShow] = React.useState(false);
    const [seconds, setSeconds] = React.useState(0);
    const [isActive] = React.useState(true);
    const [pad, setPad] =React.useState(60);


    React.useEffect(() => {
        localStorage.setItem('localStyle', JSON.stringify(props.style));
        setValue(props.style);





        let check = false;

        for (let p in props.sorted) {
            if (props.sorted[p].toggle) {
                check = true;
            }

        }

        updateShow(check);

        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 500);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        setPad(document.querySelector(".sortNav").getBoundingClientRect().height);
        return () => clearInterval(interval);

    }, [props.style, style, props.sorted, seconds, isActive]);


    document.documentElement.style.backgroundColor = props.style.body;

    return (

        <div className="App" style={{backgroundColor: style.body}}>
            <Nav/>
            <SortNav/>
            <Options/>
            <StyleOptions/>
            <div className={"mainWrapper"} style={{
                color: style.bodyText,
                backgroundColor: props.style.body,
                paddingTop: (show ? "" + pad + "px" : "0")
            }}>
                <Switch>
                    <Route path="/" component={List}/>
                </Switch>
            </div>
            <Route path={"/:id"} component={CardPage}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        style: state.style,
        sorted: state.sorted
    }
};


export default connect(mapStateToProps)(App);
