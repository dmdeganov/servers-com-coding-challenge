import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {AuthorDetailed} from '@/types';

export function useFetchAuthor(authorId: number) {
  return useQuery({
    queryFn: () => fetchAuthor(authorId),
    queryKey: ['author', authorId],
  });
}

const fetchAuthor = async (authorId: number) => {
  const response = await axios.get(`/api/author/${authorId}`);
  return response.data as AuthorDetailed;
};
