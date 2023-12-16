import React, {useEffect, useState} from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {DateValidationError, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {Autocomplete, TextField} from '@mui/material';
import {authorsOptions} from '../../../../mocks/fixtures/authors';
import {FilterParams} from '@/types';
import {useFetchAuthorsList} from '@/pages/messages/query-hooks/useFetchAuthorsList';
import AuthorsAutocomplete from '@/pages/messages/components/AuthorsAutocomplete';

interface Props {
  filter: FilterParams;
  minDate: number | undefined;
  maxDate: number | undefined;
  setFilter: React.Dispatch<React.SetStateAction<FilterParams>>;
}

const FilterPanel = ({filter, setFilter, minDate, maxDate}: Props) => {
  const [text, setText] = useState(filter.text);

  const onDateChange = (newDate: Dayjs | null, {validationError}: {validationError: DateValidationError}) => {
    if (validationError) {
      return;
    }
    if (!newDate) {
      setFilter({...filter, date: undefined});
      return;
    }
    setFilter({...filter, date: newDate.format('MM-DD-YYYY')});
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFilter(prev => ({...prev, text}));
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [text]);

  return (
    <>
      <h3>Filter messages</h3>
      <div className="filter">
        <TextField label="Contains text" value={text || ''} onChange={e => setText(e.target.value)} />
        <AuthorsAutocomplete onChange={authorId => setFilter({...filter, authorId})} authorId={filter.authorId} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={filter?.date ? dayjs(filter?.date) : null}
            minDate={minDate ? dayjs.unix(minDate) : undefined}
            maxDate={maxDate ? dayjs.unix(maxDate) : undefined}
            onChange={onDateChange}
            slotProps={{
              textField: {label: 'Date'},
            }}
          />
        </LocalizationProvider>
      </div>
    </>
  );
};

export default FilterPanel;
