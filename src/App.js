import React from 'react';
import './less/style.css';
import List from './components/main/List';
import CardPage from './components/card/CardPage'
import Nav from './components/nav/Navigation';
import Options from './components/nav/options';
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

    React.useEffect(() => {
        localStorage.setItem('localStyle', JSON.stringify(props.style));
        setValue(props.style);
    }, [props.style, style]);



    document.documentElement.style.backgroundColor=props.style.body;

    return (

        <div className="App" style={{backgroundColor: style.body}}>
            <Nav/>
            <Options/>
            <StyleOptions/>
            <div className={"mainWrapper"} style={{color:style.bodyText, backgroundColor: props.style.body}}>
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
        style:state.style
    }
};


export default connect(mapStateToProps)(App);
