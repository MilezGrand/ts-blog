import React from 'react';
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "../widgets/header";
import { FullPost, Registration, AddPost, Login, Routing } from "../pages";
import { Home } from '../pages';
import { fetchAuthMe } from '../entities/auth/model/auth';
import { useAppDispatch, useAppSelector } from '../shared/api/model/hooks/hooks';
import "./styles/index.scss";

function App() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ paddingTop: 11 }}>
                <Routing />
            </Container>
        </>
    );
}

export default App;
