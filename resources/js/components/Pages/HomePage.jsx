import React, {useEffect} from "react";
import Table from '../Table/Table';
import {CellBtn} from "../Table/components/CellBtn";
import {SPageContainer, SPageContentContainer} from './Pages.styled';
import {useDispatch, useSelector} from "react-redux";
import {selectArticles} from "../../redux/selectors";
import {deleteArticleAction, getArticleAction} from "../../redux/generalSlice";

const columns = [
    {id: 1, field: 'id', title: '№'},
    {id: 2, field: 'author', title: 'Автор'},
    {id: 3, field: 'title', title: 'Заголовок'},
    {id: 4, field: 'text', title: 'Текст'},
    {
        id: 5,
        field: 'edit',
        title: '',
        width: 100,
        component: <CellBtn color={"success"}>Редактировать</CellBtn>,
        link: '/article/:id/edit',
    },
    {
        id: 6,
        field: 'delete',
        title: '',
        width: 100,
        component: <CellBtn color={"error"}>Удалить</CellBtn>,
        callback: ({row, dispatch}) => {
            dispatch(deleteArticleAction({id: row.id}));
        }

    },
];

export const HomePage = () => {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);

    const loadArticles = () => {
        !articles.length && dispatch(getArticleAction());
    }

    useEffect(() => {
        loadArticles();
    }, [])

    return <SPageContainer>
        <SPageContentContainer>
            <Table columns={columns} rows={articles}/>
        </SPageContentContainer>
    </SPageContainer>;
}
