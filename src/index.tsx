import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import createStore from './stores';

const store = createStore();

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    margin: 0,
                    padding: 0,
                },
                body: {
                    margin: 0,
                    padding: 0,
                },
            },
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline />
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
