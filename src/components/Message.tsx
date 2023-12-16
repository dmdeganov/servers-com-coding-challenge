import React from 'react';
import {Message} from '@/types';
import {Link} from "react-router-dom";
import dayjs from "dayjs";

type Props = Message;

const MessageCard = ({text, authorId, time, authorName}: Props) => {
  const date = dayjs.unix(time).format('MMM DD YYYY, hh:mm');

  return <div className="message-card">
    <div className="message-card__top">
      <span>{date}</span>
    </div>
    <p>{text}</p>
    <div className="message-card__bottom">
      <span>By <Link to={`/author/${authorId}`}>{authorName}</Link></span>
    </div>
  </div>;
};

export default MessageCard;
