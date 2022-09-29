import React from 'react';
import Header from '../Header/Header'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import history from '../history';
import {HomePage} from "./HomePage";
import {ArticleCreatePage} from "./ArticleCreatePage";
import {ArticleShowPage} from "./ArticleShowPage";
import {Loading} from "../Loading/Loading";

const Pages = () => {
    return (
        <Router history={history}>
            <Loading />
            <Header/>
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/article/create" element={<ArticleCreatePage/>}/>
                <Route path="/article/:id/edit" element={<ArticleShowPage/>}/>
            </Routes>
        </Router>
    );
}

export default Pages;
