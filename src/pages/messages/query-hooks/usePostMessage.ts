import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {FetchMessagesResponse} from '@/types';

export function usePostMessage({onSuccess}: {onSuccess: (data: FetchMessagesResponse) => void}) {
  return useMutation({
    mutationFn: postMessage,
    onSuccess,
  });
}

const postMessage = async ({authorId, text}: {authorId: number; text: string}) => {
  const response = await axios.post('/api/new-message', {text, authorId});
  return response.data as FetchMessagesResponse;
};
