import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import styled from 'styled-components';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {selectDemoMode} from "../../redux/selectors";
import {setDemoModeAction} from "../../redux/generalSlice";
import {SLink} from "../main.styled";

const SLogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
`;

const SButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  width: 100%;
`;

const SDemoBtnContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
`;

const SSpanDemo = styled.span`
  margin-right: 2rem;
`;

const ResponsiveAppBar = () => {
    const dispatch = useDispatch();
    const isDemoMode = useSelector(selectDemoMode);

    const logout = () => {
        axios.post('http://localhost/logout').then(() => {
            window.location.href = window.location.origin;
        })
    }

    const onToggleDemoMode = () => dispatch(setDemoModeAction(!isDemoMode));

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SLink to="/home">
                        <AdbIcon
                            sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1, color: "white" }}
                        />
                    </SLink>
                    <SButtonsContainer>
                        <SLink to="/home">
                            <Button
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Все статьи
                            </Button>
                        </SLink>
                        <SLink to="/article/create">
                            <Button
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                Создать статью
                            </Button>
                        </SLink>
                        <SDemoBtnContainer>
                            {isDemoMode && <SSpanDemo>
                                Включен режим демонстрации
                            </SSpanDemo>}
                            <Button
                                onClick={onToggleDemoMode}
                                variant={"contained"}
                                color={!isDemoMode ? "secondary" : "success"}
                            >
                                Демо
                            </Button>
                        </SDemoBtnContainer>
                    </SButtonsContainer>
                    <SLogoutContainer>
                        <Button
                            sx={{my: 2, color: 'white', display: 'block'}}
                            onClick={logout}
                        >
                            Выйти
                        </Button>
                    </SLogoutContainer>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
