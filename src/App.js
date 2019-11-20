import React from 'react';
import './less/style.css';
import List from './components/main/List';
import CardPage from './components/card/CardPage'
import Nav from './components/nav/Navigation';
import Options from './components/nav/options';

import {
    Switch,
    Route, matchPath, useLocation
} from "react-router-dom";

function App() {

    let location = useLocation();


    let fixer;

    if (location.pathname!=="/") {
        fixer = {
            position: "fixed"
        };

    } else {
        fixer = {
            overflow: "visible"
        }
    }

    return (

        <div className="App">
            <Nav/>
            <Options/>
            <div className={"mainWrapper"} style={fixer}>
                <Switch>
                    <Route path="/" component={List}/>
                </Switch>


            </div>
            <Route path={"/:id"} component={CardPage}/>
        </div>
    );
}


export default App;
