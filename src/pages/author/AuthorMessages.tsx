import React from 'react';
import MessagesList from '@/components/MessagesList';
import {useFetchMessages} from '@/common-query-hooks/useFetchMessages';
import {useParams} from 'react-router-dom';
import {CircularProgress} from '@mui/material';

const AuthorMessages = () => {
  const {authorId} = useParams();

  const {data, isSuccess, isLoading} = useFetchMessages({authorId: Number(authorId)});
  if (isLoading) return <CircularProgress />;

  return isSuccess ? <MessagesList messages={data.messages} /> : null;
};

export default AuthorMessages;
