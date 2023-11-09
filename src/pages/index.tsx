import { Routes, Route } from 'react-router-dom';
import React from 'react';

import { Home } from './home';
import { FullPost } from './full-post';
import { AddPost } from './add-post';

export { Home } from './home';
export { FullPost } from './full-post';
export { AddPost } from './add-post';
export { Login } from '../widgets/modal-login';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<FullPost />} />
      <Route path="/posts/:id/edit" element={<AddPost />} />
      <Route path="/add-post" element={<AddPost />} />
    </Routes>
  );
};
