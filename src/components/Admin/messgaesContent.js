import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  selectDeleteMessagesErrors,
  selectDeleteMessagesStatus,
} from "../../redux/features/messages/messagesSelectors";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessageThunk } from "../../redux/features/messages/messagesThunk";
import showToast from "../costumToast";
import { ToastContainer } from "react-toastify";

import moment from "moment";

const MessagesContent = ({ messages, onMessageDeleted }) => {
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const dispatch = useDispatch();
  const deleteMessagesErrors = useSelector(selectDeleteMessagesErrors);
  const deleteMessagesStatus = useSelector(selectDeleteMessagesStatus);

  const handleCloseDeleteMessageModal = useCallback(() => {
    setShowDeleteMessageModal(false);
    setSelectedMessage(null);
  }, []);

  const handleShowDeleteMessageModal = (message) => {
    setSelectedMessage(message);
    setShowDeleteMessageModal(true);
  };

  const handleDeleteMessage = async () => {
    if (selectedMessage) {
      try {
        await dispatch(deleteMessageThunk(selectedMessage._id));
        showToast("success", "Message deleted successfully");
        handleCloseDeleteMessageModal(); // Close modal after successful deletion
        onMessageDeleted(selectedMessage._id); // Notify parent component about the deletion
      } catch (error) {
        showToast("error", "Message delete failed", deleteMessagesErrors);
      }
    }
  };

  useEffect(() => {
    if (deleteMessagesStatus === "succeeded") {
      handleCloseDeleteMessageModal(); // Close modal after successful deletion
    }
  }, [
    deleteMessagesStatus,
    deleteMessagesErrors,
    handleCloseDeleteMessageModal,
  ]);

  return (
    <Container className="messageContent-Container">
      <ToastContainer />
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id}>
            <Row className="message-title">
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <h4>{message.title}</h4>
              </Col>
            </Row>

            <Row className="first-row other">
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                Sender Name: {message.SenderName}
              </Col>
            </Row>

            <Row className="first-row other">
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                Sender Email: {message.senderEmail}
              </Col>
            </Row>

            <Row className="second-row other">
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                Message Content: {message.messageContent}
              </Col>
            </Row>

            <Row className="other msg-delete-row">
              <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                <p>
                  Date: {moment(message.createdDate).format("YYYY-MM-DD HH:mm")}
                </p>
                <i
                  onClick={() => handleShowDeleteMessageModal(message)}
                  className="fa-solid fa-delete-left msg-btn"
                ></i>
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <Row>
          <Col>
            <p>No messages available</p>
          </Col>
        </Row>
      )}

      {selectedMessage && (
        <Modal
          show={showDeleteMessageModal}
          onHide={handleCloseDeleteMessageModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Message: {selectedMessage.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete this message?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteMessageModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteMessage}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default MessagesContent;
