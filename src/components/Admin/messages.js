import { Container, Row } from "react-bootstrap";
import MessagesContent from "./messgaesContent";
import {
  selectGetMessages,
  selectGetMessagesStatus,
  selectGetMessagesErrors,
  selectDeleteMessagesStatus
} from "../../redux/features/messages/messagesSelectors";
import { getMessagesThunk } from "../../redux/features/messages/messagesThunk";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const Messages = () => {
  const getMessagesData = useSelector(selectGetMessages);
  const getMessagesErrors = useSelector(selectGetMessagesErrors);
  const getMessagesStatus = useSelector(selectGetMessagesStatus);
  const deleteMessagesStatus = useSelector(selectDeleteMessagesStatus);
  const dispatch = useDispatch();

  // Local state for storing messages
  const [localMessages, setLocalMessages] = useState([]);

  useEffect(() => {
    if (getMessagesStatus === "idle") {
      dispatch(getMessagesThunk());
    }
  }, [dispatch, getMessagesStatus]);

  useEffect(() => {
    if (getMessagesStatus === "succeeded" && Array.isArray(getMessagesData)) {
      setLocalMessages(getMessagesData);
    }
  }, [getMessagesData, getMessagesStatus]);

  // Refetch messages when a delete operation succeeds
  useEffect(() => {
    if (deleteMessagesStatus === 'succeeded') {
      dispatch(getMessagesThunk()); // Refetch messages to update local state
    }
  }, [deleteMessagesStatus, dispatch]);

  // Update local messages after a message is deleted
  const handleMessageDeleted = (deletedMessageId) => {
    setLocalMessages(localMessages.filter(message => message._id !== deletedMessageId));
  };

  return (
    <Container>
      <Row className="main-title">
        <h3>Messages</h3>
      </Row>

      <Row>
        <MessagesContent 
          messages={localMessages} 
          onMessageDeleted={handleMessageDeleted}
        />
      </Row>
    </Container>
  );
};

export default Messages;