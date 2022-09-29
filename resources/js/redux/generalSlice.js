import { createSlice } from '@reduxjs/toolkit';
import {apiDelete, apiGet, apiPost, apiPut} from "../api";
import {selectArticleById, selectArticles, selectDemoMode, selectSaveDemoArticles} from "./selectors";
import {generateNewArticle} from "../components/helpFunctions";

const initialState = {
    demoMode: false,
    articles: [],
    error: null,
    loading: false,
    alert: false,
    saveDemoArticles: [],
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        saveDemoArticles(state, {payload}) {
            state.saveDemoArticles = payload
        },
        setLoading(state, {payload}) {
            state.loading = payload;
        },
        setAlert(state, {payload}) {
            state.alert = payload;
        },
        setDemoMode(state, {payload}) {
            state.demoMode = payload;
        },
        setArticles(state, {payload}) {
            state.articles = payload;
        },
        addArticle(state, {payload}) {
            state.articles.push(payload);
        },
        replaceArticle(state, {payload}) {
            const idx = state.articles.findIndex((item) => item.id === payload.id);
            if (idx !== -1) {
                state.articles.splice(idx, 1, payload);
            }
        },
        deleteArticle(state, {payload}) {
            const idx = state.articles.findIndex((item) => item.id === payload);
            if (idx !== -1) {
                state.articles.splice(idx, 1);
            }
        },
        rejected(state, {payload}) {
            state.error = payload
        }
    },
});

export const general = generalSlice.reducer;
export const {
    saveDemoArticles,
    setLoading,
    setAlert,
    setDemoMode,
    setArticles,
    addArticle,
    replaceArticle,
    deleteArticle,
    rejected
} = generalSlice.actions;

export const setAlertAction = (isOpen) => async (dispatch) => {
    dispatch(setAlert(isOpen));
}

export const setDemoModeAction = (isDemoMode) => async (dispatch, getState) => {
    if (isDemoMode) {
        const saveDemoArticles = selectSaveDemoArticles(getState());
        dispatch(setArticles(saveDemoArticles));
    } else {
        const articles = selectArticles(getState());
        dispatch(saveDemoArticles(articles))
        dispatch(getArticleAction());
    }
    dispatch(setDemoMode(isDemoMode));
}

export const getArticleAction = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await apiGet('articles');
        dispatch(setArticles(data));
    } catch (err) {
        dispatch(rejected(JSON.stringify(err)));
    } finally {
        dispatch(setLoading(false));
    }
};

export const showArticleAction = (id) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
        const isDemoMode = selectDemoMode(getState());
        let showRow;
        if (isDemoMode) {
            showRow = selectArticleById(getState(), +id);
        } else {
            const { data } = await apiGet(`articles/${id}`);
            showRow = data;
        }
        return showRow;
    } catch (err) {
        dispatch(rejected(JSON.stringify(err)));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addNewArticleAction = ({callback, values}) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
        const isDemoMode = selectDemoMode(getState());
        let newRow
        if (isDemoMode) {
            const articles = selectArticles(getState());
            if (articles.length >= 3) {
                dispatch(setAlertAction(true));
                return;
            }
            newRow = generateNewArticle({...values, lastId: articles.length + 1})
        } else {
            const { data } = await apiPost('articles', values);
            newRow = data;
        }
        dispatch(addArticle(newRow));
        callback();
    } catch (err) {
        dispatch(rejected(JSON.stringify(err)));
    } finally {
        dispatch(setLoading(false));
    }
};

export const editArticleAction = ({id, title, text}) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
        const isDemoMode = selectDemoMode(getState());
        let editRow;
        if (isDemoMode) {
            editRow = selectArticleById(getState(), +id);
            editRow = {...editRow, title, text};
        } else {
            const { data } = await apiPut(`articles/${id}`, {title, text});
            editRow = data;
        }
        dispatch(replaceArticle(editRow));
    } catch (err) {
        dispatch(rejected(JSON.stringify(err)));
    } finally {
        dispatch(setLoading(false));
    }
};


export const deleteArticleAction = ({id}) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
        const isDemoMode = selectDemoMode(getState());
        if (!isDemoMode) {
            await apiDelete(`articles/${id}`);
        }
        dispatch(deleteArticle(id));
    } catch (err) {
        dispatch(rejected(JSON.stringify(err)));
    } finally {
        dispatch(setLoading(false));
    }
};
