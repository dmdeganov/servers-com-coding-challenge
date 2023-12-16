import React from 'react';
import {useFetchAuthor} from '@/pages/author/quey-hooks/useFetchAuthor';
import {useParams} from 'react-router-dom';
import AuthorMessages from '@/pages/author/AuthorMessages';
import FullPageLoader from '@/components/FullPageLoader';

const AuthorPage = () => {
  const {authorId} = useParams();
  const {data: author, isSuccess, isLoading} = useFetchAuthor(Number(authorId));

  if (isLoading) {
    return <FullPageLoader />;
  }
  if (!isSuccess) {
    return null;
  }

  return (
    <div className="author">
      <div className="author__info">
        <img src={author.photo} alt="author image" className="author__image" />
        <div className="author__details">
          <h1>{author.name}</h1>
          <ul>
            <li>
              <span>age:</span> <span>{author.age}</span>
            </li>
            <li>
              <span>phone:</span> <span>{author.phone}</span>
            </li>
            <li>
              <span>email:</span> <span>{author.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <h2>{`Author's messages`}</h2>
      <div className="author__messages">
        <AuthorMessages />
      </div>
    </div>
  );
};

export default AuthorPage;
