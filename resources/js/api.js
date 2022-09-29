import axios from 'axios';

const scheme = 'http';
const port = '80';
const host = window.location.hostname;

export const baseUrl = `${scheme}://${host}:${port}/api`;

export async function apiGet(url, params) {
    const {data} = await axios
        .get(`${baseUrl}/${url}`, {userId: window.userId, ...params})
    return data;
}

export async function apiPost(url, params) {
    const {data} = await axios
        .post(`${baseUrl}/${url}`, {userId: window.userId, ...params});
    return data;
}

export async function apiPut(url, params) {
    const {data} = await axios
        .put(`${baseUrl}/${url}`, {userId: window.userId, ...params});
    return data;
}

export async function apiDelete(url, params) {
    const {data} = await axios
        .delete(`${baseUrl}/${url}`, {userId: window.userId, ...params});
    return data;
}
