import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import {showArticleAction} from "../../redux/generalSlice";
import {ArticleCreatePage} from "./ArticleCreatePage";

export const ArticleShowPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [article, setArticle] = useState();

    const load = async () => {
        const data = await dispatch(showArticleAction(id));
        setArticle(data);
    }

    useEffect(() => {
        load();
    }, [])

    return <ArticleCreatePage {...article} isEdit/>
}
