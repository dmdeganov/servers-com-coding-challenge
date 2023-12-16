import React, {useState} from 'react';
import {useFetchMessages} from '@/common-query-hooks/useFetchMessages';
import MessagesList from '@/components/MessagesList';
import FilterPanel from '@/pages/messages/components/FilterPanel';
import {FilterParams} from '@/types';
import AddIcon from '@mui/icons-material/Add';
import useModal from '@/hooks/useModal';
import NewMessageModal from '@/pages/messages/components/NewMessageModal';
import FullPageLoader from "@/components/FullPageLoader";

const MessagesPage = () => {
  const [filter, setFilter] = useState<FilterParams>({});
  const {data, isLoading, isSuccess} = useFetchMessages(filter);
  const {isOpen, open, close} = useModal();

  return (
    <>
      <div className="messages-page">
        <FilterPanel filter={filter} setFilter={setFilter} minDate={data?.minDate} maxDate={data?.maxDate} />
        {isLoading && <FullPageLoader />}
        {isSuccess && <MessagesList messages={data.messages} />}
        <button className="messages-page__add-button" onClick={open}>
          <AddIcon color="primary" />
        </button>
      </div>
      <NewMessageModal isOpen={isOpen} close={close} resetFilter={() => setFilter({})} />
    </>
  );
};

export default MessagesPage;
