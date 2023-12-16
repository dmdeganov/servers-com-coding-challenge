import React from 'react';
import {Autocomplete, TextField} from '@mui/material';
import {useFetchAuthorsList} from '@/pages/messages/query-hooks/useFetchAuthorsList';

const AuthorsAutocomplete = ({authorId, onChange}: {authorId: number | undefined; onChange: (id: number | undefined) => void}) => {
  const {data, isSuccess} = useFetchAuthorsList();
  const authors = isSuccess ? data.authors : [];

  return (
    <Autocomplete
      value={authorId ? authors.find(author => author.id === authorId) : null}
      onChange={(e, option) => onChange(option?.id)}
      disablePortal
      options={authors || []}
      renderInput={params => <TextField {...params} label="Author" />}
    />
  );
};

export default AuthorsAutocomplete;
