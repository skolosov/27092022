import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {setAlertAction} from "../../redux/generalSlice";
import {selectAlert} from "../../redux/selectors";

export default function CustomizedSnackbars() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectAlert);

    const handleClose = () => {
        dispatch(setAlertAction(false));
    };

    return (
            <Snackbar
                open={isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    elevation={6}
                >
                    В демо режиме нельзяя создать больше 3 статей
                </Alert>
            </Snackbar>
    );
}
