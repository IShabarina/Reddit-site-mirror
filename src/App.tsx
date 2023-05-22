import React, { useEffect } from "react";
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Header } from './shared/Header';
import { Layout } from './shared/Layout';
import { Content } from './shared/Content';
import { CardsList } from "./shared/CardsList";
import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./shared/redux/rootReducer";
import thunk from "redux-thunk";
import { saveToken } from "./shared/redux/setToken/actions";

//var of object store with getState, dispatch methods:
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

function AppComponent() {
    const dispatch = useDispatch<any>();
    console.log(store.getState().token);
     useEffect(() => {
        dispatch(saveToken());
    }, []);

    return (
        <Layout>
            <Header />
            <Content>
                <CardsList />
            </Content>
        </Layout>
    );
}


export const App = hot(() =>
    <Provider store={store}>
        <AppComponent />
    </Provider>
);


