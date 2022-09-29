import React from "react";
import {SPageContainer, SPageContentContainer} from "./Pages.styled";
import {ArticleForm} from "../Form/ArticleForm";

export const ArticleCreatePage = (props) => {
    const {isEdit} = props;
    const headLabel = isEdit
        ? 'Редактирование статьи'
        : 'Создание статьи';
    return <SPageContainer>
        <SPageContentContainer>
            <h1>{headLabel}</h1>
            <ArticleForm {...props} />
        </SPageContentContainer>
    </SPageContainer>;
}
