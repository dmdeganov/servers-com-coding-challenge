import {enqueueSnackbar} from 'notistack';

const serverErrorMessage = 'Something went wrong. Please try again later';

export const onQueryError = () => {
  enqueueSnackbar(serverErrorMessage, {
    variant: 'error',
    autoHideDuration: 3000,
  });
};
