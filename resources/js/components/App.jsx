import React from 'react';
import ReactDOM from 'react-dom';
import Pages from "./Pages";
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <Pages />
        </Provider>
    );
}

if (document.getElementById('app-react')) {
    ReactDOM.render(<App/>, document.getElementById('app-react'));
}
