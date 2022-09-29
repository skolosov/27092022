import * as React from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import {Button, Card, FormControl} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addNewArticleAction, editArticleAction} from "../../redux/generalSlice";

const SCard = styled(Card)`
  padding: 1rem;
  max-width: 1000px;
`;

const SFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .child {
    margin: 0.5rem;
  }
`;

export const ArticleForm = ({id, title: titleValue, text: textValue, isEdit}) => {
    const dispatch = useDispatch();
    const btnSubmitLabel = isEdit ? 'Редактировать' : 'Создать';
    const [title, setTitle] = useState(titleValue ?? '');
    const [text, setText] = useState(textValue ?? '');

    useEffect(() => {
        titleValue && setTitle(titleValue);
        textValue && setText(textValue);
    }, [titleValue,textValue])

    const onChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const onChangeText = (event) => {
        setText(event.target.value);
    }

    const clearInputs = () => {
        setTitle('');
        setText('');
    }

    const addNewOrEditArticle = () => {
        isEdit
            ? dispatch(editArticleAction({id, title, text}))
            : dispatch(addNewArticleAction({callback: clearInputs, values: {title, text}}));
    }

    return (
        <SCard>
            <SFormContainer>
                <FormControl>
                    <TextField
                        id="outlined-basic"
                        label="Заголовок"
                        variant="outlined"
                        className="child"
                        onChange={onChangeTitle}
                        value={title}
                        required={true}
                    />
                    <TextField
                        id="outlined-basic"
                        maxRows={3}
                        multiline
                        label="Текст статьи"
                        variant="outlined"
                        className="child"
                        onChange={onChangeText}
                        value={text}
                        required={true}
                    />
                    <Button
                        variant={"contained"}
                        color={"success"}
                        onClick={addNewOrEditArticle}
                    >
                        {btnSubmitLabel}
                    </Button>
                </FormControl>
            </SFormContainer>
        </SCard>
    );
}
