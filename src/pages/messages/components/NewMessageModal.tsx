import React, {useState} from 'react';
import Modal from '@/components/modal';
import {Button, CircularProgress, TextField} from '@mui/material';
import AuthorsAutocomplete from '@/pages/messages/components/AuthorsAutocomplete';
import {usePostMessage} from '@/pages/messages/query-hooks/usePostMessage';
import {queryClient} from '@/App';
import {FetchMessagesResponse} from '@/types';

interface Props {
  isOpen: boolean;
  close: () => void;
  resetFilter: () => void;
}

const NewMessageModal = ({isOpen, close, resetFilter}: Props) => {
  const [authorId, setAuthorId] = useState<number | undefined>();
  const [message, setMessage] = useState('');
  const messageTooLong = message.length > 200;

  const onSuccess = (data: FetchMessagesResponse) => {
    setAuthorId(undefined);
    setMessage('');
    resetFilter();
    queryClient.setQueryData(['messages'], data);
    close();
  };

  const {mutate: postMessage, isPending} = usePostMessage({onSuccess});

  const isMessageValid = Boolean(authorId && message && !messageTooLong);
  const onSubmit = () => {
    if (!isMessageValid) return;
    postMessage({text: message, authorId: authorId!});
  };

  return (
    <Modal isOpen={isOpen} close={close} className="add-message-modal" preventClosing={isPending}>
      <form >
        <AuthorsAutocomplete authorId={authorId} onChange={id => setAuthorId(id)} />
        <TextField
          error={messageTooLong}
          value={message}
          onChange={e => {
            setMessage(e.target.value);
          }}
          label="Message"
          multiline
          minRows={5}
          helperText={`${message.length}/200`}
        />
        <Button
          variant="contained"
          disabled={!isMessageValid}
          onClick={onSubmit}
          endIcon={isPending ? <CircularProgress size={16} color="inherit" /> : null}>
          Send
        </Button>
      </form>
    </Modal>
  );
};

export default NewMessageModal;
