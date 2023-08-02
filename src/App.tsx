import React, { useEffect, useState } from "react";
import './main.global.css';
import { hot } from 'react-hot-loader/root';
import { Header } from './shared/Header';
import { Layout } from './shared/Layout';
import { Content } from './shared/Content';
import { CardsList } from "./shared/CardsList";
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./shared/redux/rootReducer";
import thunk from "redux-thunk";
import { saveToken } from "./shared/redux/setToken/actions";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Post } from "./shared/Post";
import { NotFoundPage } from "./shared/NotFoundPage/NotFoundPage";

//var of object store with getState, dispatch methods:
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

function AppComponent() {
    const dispatch = useDispatch<any>();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        dispatch(saveToken());
    }, []);

    return (
        <>
            {mounted && (
                <BrowserRouter>
                    <Layout>
                        <Header />
                        <Content>
                            <Routes >
                                <Route path="/auth" element={<Navigate to="/posts" />} />
                                <Route path="/" element={<Navigate to="/posts" />} />
                                <Route path="/posts/*" element={<CardsList />}>
                                    <Route path=":id" element={<Post />} />
                                </Route>
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Content>
                    </Layout>
                </BrowserRouter>
            )}
        </>
    );
}


export const App = hot(() =>
    <Provider store={store}>
        <AppComponent />
    </Provider>
);


