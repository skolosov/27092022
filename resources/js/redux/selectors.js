import {createSelector} from '@reduxjs/toolkit';

export const selectDemoMode = ({general}) => general.demoMode;
export const selectArticles = ({general}) => general.articles;
