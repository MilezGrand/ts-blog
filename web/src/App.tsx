import React from 'react';
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header, UserInfo } from "./components";
import { FullPost, Registration, AddPost, Login } from "./pages";
import { Home } from './pages/';
import { fetchAuthMe } from './redux/slices/auth';
import { useAppDispatch, useAppSelector } from './hooks/hooks';

function App() {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => state.authReducer.user);
    

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{paddingTop: 11}}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts/:id" element={<FullPost />} />
                    <Route path="/posts/:id/edit" element={<AddPost />} />
                    <Route path="/add-post" element={<AddPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registration />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
