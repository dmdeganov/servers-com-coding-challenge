import React from 'react';
import {createBrowserRouter, Link, RouterProvider} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';
import Layout from '@/Layout';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {theme} from '@/theme';
import MessagesPage from '@/pages/messages/MessagesPage';
import AuthorPage from '@/pages/author/AuthorPage';
import {QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {onQueryError} from '@/utils/onQueryError';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: onQueryError,
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000,
      retry: 2,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MessagesPage />,
      },
      {
        path: 'author/:authorId',
        element: <AuthorPage />,
      },
      {
        path: '*',
        element: (
          <p>
            Page Not found. Go to <Link to="/">Stories list</Link>
          </p>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
      {/*<ReactQueryDevtools />*/}
    </QueryClientProvider>
  );
};

export default App;
