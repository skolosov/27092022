import {createSelector} from '@reduxjs/toolkit';

export const selectDemoMode = ({general}) => general.demoMode;
export const selectArticles = ({general}) => general.articles;
export const selectAlert = ({general}) => general.alert;
export const selectSaveDemoArticles = ({general}) => general.saveDemoArticles;

export const selectArticleById = createSelector(
    [
        selectArticles,
        (state, id) => id,
    ],
    (articles, id) => {
        return articles.find((item) => {
            console.log({item, id})
            return item.id === id
        })
    }
);
