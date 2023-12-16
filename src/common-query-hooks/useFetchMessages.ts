import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {FetchMessagesResponse, FilterParams} from '@/types';

export function useFetchMessages(filter: Partial<FilterParams>) {
  return useQuery({
    queryFn: () => fetchMessages(filter),
    queryKey: ['messages', filter.date, filter.text, filter.authorId].filter(dep => dep),
  });
}

const fetchMessages = async (params: FilterParams) => {
  const {authorId, date, text} = params;

  const response = await axios.get('/api/messages', {
    params: {authorId: authorId || undefined, date: date || undefined, text: text || undefined},
  });
  return response.data as FetchMessagesResponse;
};
