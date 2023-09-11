import { Routes, Route } from 'react-router-dom';
import React from 'react';

import { Home } from './home';
import { FullPost } from './full-post';
import { AddPost } from './add-post';
import { Login } from './login';
import { Registration } from './registration';

export { Home } from './home';
export { FullPost } from './full-post';
export { AddPost } from './add-post';
export { Registration } from './registration';
export { Login } from './login';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<FullPost />} />
      <Route path="/posts/:id/edit" element={<AddPost />} />
      <Route path="/add-post" element={<AddPost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
};
