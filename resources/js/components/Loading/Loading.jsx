import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import CircularProgress from "@mui/material/CircularProgress";

const SLoaderContainer = styled.div`
  z-index: 1400;
  height: 100vh;
  width: 100vw;
  position: absolute;

  .icon {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
  }

    .linear {
        display: flex;
        position: absolute;
        top: 40%;
        left: 40%;
        width: 371px;
        background-color: #fff;
        padding: 1rem;
        flex-direction: column;
        gap: 20px;
        border: 1px solid #ccc;
        border-radius: 2px;
    }
`;

export const Loading = () => {
    const loading = useSelector((state) => state.general.loading);
    return loading ? (
        <SLoaderContainer>
            <div className="icon">
                <CircularProgress color="secondary"/>
            </div>
        </SLoaderContainer>
    ) : null;
};
