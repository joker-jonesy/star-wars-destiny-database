import React from 'react';
import './less/style.css';
import List from './components/main/List';
import CardPage from './components/card/CardPage'
import Nav from './components/nav/Navigation';
import Options from './components/nav/options';

import {
    Switch,
    Route,
    useLocation
} from "react-router-dom";

function App() {

    let location = useLocation();
    let background = location.state && location.state.background;




    return (

            <div className="App">
                <Nav/>
                <Options/>
                <div className={"mainWrapper"}>
                <Switch location={background || location}>
                    <Route exact path="/" component={List}/>
                </Switch>

                    {background && <Route path={"/:id"} children={<CardPage/>}/>}
                </div>
            </div>
    );
}


export default App;
