import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./redux/reducers";
import {BrowserRouter as Router} from "react-router-dom";

const store = createStore(rootReducer);

ReactDOM.render(

    <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
            <App/>
        </Router>
    </Provider>,

    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
