import { createSlice } from '@reduxjs/toolkit';
import {apiDelete, apiGet, apiPost, apiPut} from "../api";
import history from "../components/history";

const initialState = {
    demoMode: false,
    articles: [],
    error: null,
    loading: false,
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setLoading(state, {payload}) {
            state.loading = payload;
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
    setLoading,
    setDemoMode,
    setArticles,
    addArticle,
    replaceArticle,
    deleteArticle,
    rejected
} = generalSlice.actions;

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

export const showArticleAction = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await apiGet(`articles/${id}`);
        return data;
    } catch (err) {
        dispatch(rejected(JSON.stringify(err)));
    } finally {
        dispatch(setLoading(false));
    }
};

export const addNewArticleAction = ({callback, values}) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await apiPost('articles', values);
        dispatch(addArticle(data));
        callback();
    } catch (err) {
        dispatch(rejected(JSON.stringify(err)));
    } finally {
        dispatch(setLoading(false));
    }
};

export const editArticleAction = ({id, title, text}) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await apiPut(`articles/${id}`, {title, text});
        dispatch(replaceArticle(data));
    } catch (err) {
        dispatch(rejected(JSON.stringify(err)));
    } finally {
        dispatch(setLoading(false));
    }
};


export const deleteArticleAction = ({id}) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await apiDelete(`articles/${id}`);
        dispatch(deleteArticle(id));
    } catch (err) {
        dispatch(rejected(JSON.stringify(err)));
    } finally {
        dispatch(setLoading(false));
    }
};
