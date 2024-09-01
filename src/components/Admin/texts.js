import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getTexts,
  UpdateTextsThunk,
} from "../../redux/features/texts/textsThunk";

import {
  selectTexts,
  selectTextErrors,
  selectTextsStatus,
  selectUpdateTextsErrors,
  selectUpdateTextsStatus,
} from "../../redux/features/texts/textsSelector";

import showToast from "../costumToast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

const Texts = () => {
  // #== Start Local Texts State ==#
  // Local state to manage text fields and modal visibility
  const [localTexts, setLocalTexts] = useState({
    id: null,
    aboutMe: "",
    education: "",
    services: "",
  });

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentField, setCurrentField] = useState("");

  // #== Start USE SELECTORS ==#
  // Use Redux selectors to fetch state and dispatch actions
  const getTextsData = useSelector(selectTexts);
  const getTextsErrors = useSelector(selectTextErrors);
  const getTextsStatus = useSelector(selectTextsStatus);
  const dispatch = useDispatch();
  // !-- end USE SELECTORS --!

  // #== Start FETCH TEXTS DATA ==#
  useEffect(() => {
    if (getTextsStatus === "idle") {
      dispatch(getTexts());
    }
  }, [dispatch, getTextsStatus]);

  useEffect(() => {
    if (
      getTextsStatus === "succeeded" &&
      Array.isArray(getTextsData) &&
      getTextsData.length > 0
    ) {
      setLocalTexts({
        id: getTextsData[0]._id,
        aboutMe: getTextsData[0].AboutMe || "",
        services: getTextsData[0].Services || "",
        education: getTextsData[0].Education || "",
      });
    }
  }, [getTextsStatus, getTextsData]);
  // !-- end FETCH TEXTS DATA --!

  // #== Start Conditional Rendering ==#
  if (getTextsStatus === "loading") {
    return <Spinner animation="border" variant="secondary" />;
  }

  if (getTextsStatus === "failed") {
    showToast(
      "error",
      getTextsErrors || "An error occurred while fetching texts."
    );
  }
  // !-- end Conditional Rendering --!

  // #== Start Modal Handlers ==#
  // Handle showing and closing of the update modal
  const handleShowUpdateModal = (field) => {
    setCurrentField(field);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    if (Array.isArray(getTextsData) && getTextsData.length > 0) {
      setLocalTexts({
        id: getTextsData[0]._id,
        aboutMe: getTextsData[0].AboutMe || "",
        services: getTextsData[0].Services || "",
        education: getTextsData[0].Education || "",
      });
    }
    setShowUpdateModal(false);
  };
  // !-- end Modal Handlers --!

  // #== Start Text Change Handlers ==#
  // Update local state with changes from text input
  const handleTextChange = (e) => {
    setLocalTexts({
      ...localTexts,
      [currentField]: e.target.value,
    });
  };

  // Save updated text data to the server
  const handleSaveUpdatedTexts = async () => {
    const { aboutMe, services, education } = localTexts;

    if (!aboutMe || !services || !education) {
      showToast("warn", "Updated field Is required Should not be empty");
      return;
    }

    const updatedTextData = {
      id: localTexts.id,
      AboutMe: localTexts.aboutMe,
      Education: localTexts.education,
      Services: localTexts.services,
    };

    try {
      await dispatch(
        UpdateTextsThunk({ id: localTexts.id, data: updatedTextData })
      ).unwrap();
      handleCloseUpdateModal();
      showToast("success", "Texts Updated Successfully");
      dispatch(getTexts);
    } catch (error) {
      showToast(
        "error",
        error.message || "Failed to update personal information."
      );
    }
  };
  // !-- end Text Change Handlers --!

  // #== Start Render Component ==#
  return (
    <Container>
      <ToastContainer />
      <Row className="text-page-title">
        <h3>Text Manage Page</h3>
      </Row>
      <Row>
        <Col xl={4} lg={4} md={4} sm={12} xs={12} className="cols">
          <Row className="titles">
            <Col xl={8} lg={8} md={8} sm={8} xs={8}>
              <h4>AboutMe</h4>
            </Col>

            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
              <button
                onClick={() => handleShowUpdateModal("aboutMe")}
                className="edit-btn"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
            </Col>
          </Row>

          <Row>
            <p>{localTexts.aboutMe}</p>
          </Row>
        </Col>

        <Col xl={4} lg={4} md={4} sm={12} xs={12} className="cols">
          <Row className="titles">
            <Col xl={8} lg={8} md={8} sm={8} xs={8}>
              <h4>Education</h4>
            </Col>

            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
              <button
                onClick={() => handleShowUpdateModal("education")}
                className="edit-btn"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
            </Col>
          </Row>

          <Row>
            <p>{localTexts.education}</p>
          </Row>
        </Col>

        <Col xl={4} lg={4} md={4} sm={12} xs={12} className="cols">
          <Row className="titles">
            <Col xl={8} lg={8} md={8} sm={8} xs={8}>
              <h4>Services</h4>
            </Col>

            <Col xl={4} lg={4} md={4} sm={4} xs={4}>
              <button
                onClick={() => handleShowUpdateModal("services")}
                className="edit-btn"
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
            </Col>
          </Row>

          <Row>
            <p>{localTexts.services}</p>
          </Row>
        </Col>
      </Row>

      {/* Modal for updating */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUpdateText">
              <Form.Label>Update {currentField}</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={localTexts[currentField]}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUpdatedTexts}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Texts;
