import React from 'react';
import {Link, Outlet, ScrollRestoration} from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};

export default Layout;
