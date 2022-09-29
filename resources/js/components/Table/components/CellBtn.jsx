import {Button} from "@mui/material";
import React from "react";
import {useDispatch} from "react-redux";
import {SLink} from "../../main.styled";

export const CellBtn = ({cell, row, color, children}) => {
    const dispatch = useDispatch();
    const onClickHandler = () => {
        cell?.callback && cell?.callback({cell, row, dispatch});
    }
    let link;
    if (cell.link) {
        link = cell.link.replace(':id', row.id);
    }

    return link ? (
        <SLink to={link}>
            <Button
                variant="contained"
                color={color}
                onClick={onClickHandler}
                size="small"
            >
                {children}
            </Button>
        </SLink>
    ) : (
        <Button
            variant="contained"
            color={color}
            onClick={onClickHandler}
            size="small"
        >
            {children}
        </Button>
    );
}
