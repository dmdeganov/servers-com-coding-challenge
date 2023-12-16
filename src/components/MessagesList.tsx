import React from 'react';
import {Message} from '@/types';
import MessageCard from '@/components/Message';

interface Props {
  messages: Message[];
}

const MessagesList = ({messages}: Props) => {
  return (
    <div className="messages-list">
      {messages.map(message => (
        <MessageCard {...message} key={message.id} />
      ))}
    </div>
  );
};

export default React.memo(MessagesList);
