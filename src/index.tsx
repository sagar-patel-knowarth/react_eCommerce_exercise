import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import "./assets/css/robot.css";
import "./assets/css/font-awesome.css";
import "./assets/css/grid.css";
import "./assets/css/main.css";
import "./assets/css/header.css";
import "./assets/css/footer.css";
import "./assets/css/book-detail.css";
import "./assets/css/book-gallery.css";
import "./assets/css/button.css";
import "./assets/css/start.css";
import "./assets/css/breadcrumb.css";
import "./assets/css/order-list.css";
import "./assets/css/cart.css";
import "./assets/css/form-elements.css";
import "./assets/css/thankyou.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import combineReducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga';


const sagaMiddleware = createSagaMiddleware()
const store = createStore(combineReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default store;
