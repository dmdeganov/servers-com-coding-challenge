import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export function useFetchAuthorsList() {
  return useQuery({
    queryFn: fetchAuthors,
    queryKey: ['authors'],
  });
}

const fetchAuthors = async () => {
  const response = await axios.get('/api/authors');
  return response.data as {authors: Array<{name: string; id: number}>};
};
