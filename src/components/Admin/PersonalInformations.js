// #== Start REACT IMPORTS ==#
import { useState, useEffect } from "react";
// #!-- end REACT IMPORTS --!

// #== Start BOOTSTRAP IMPORTS ==#
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
// #!-- end BOOTSTRAP IMPORTS --!

// #== Start REDUX IMPORTS ==#
import {
  getPersonalInfo,
  putNewPersonalInfo,
} from "../../redux/features/personalInformations/personalInfoThunk";
import {
  selectPersonalInfo,
  selectPersonalInfoError,
  selectPersonalInfoStatus,
  selectUpdatePersonalInfoStatus,
} from "../../redux/features/personalInformations/personalInfoSelectors";
import { useSelector, useDispatch } from "react-redux";
// #!-- end REDUX IMPORTS --!

// #== Start IMAGE IMPORT ==#
import imageim from "../../images/imageim.png";
// #!-- end IMAGE IMPORT --!

const PersonalInformations = () => {
  // #== Start LOCAL STATE ==#
  const [localPersonalInfo, setLocalPersonalInfo] = useState({
    id: null,
    name: "",
    email: "",
    number: "",
  });

  const [errorAlert, setErrorAlert] = useState(""); // Error state
  const [showSucceededUpdateAlert, setShowSucceededUpdateAlert] =
    useState(false);
  // #!-- end LOCAL STATE --!

  // #== Start REDUX HOOKS ==#
  const dispatch = useDispatch();
  const getPersonalinfoData = useSelector(selectPersonalInfo);
  const getPersonalInfoStatus = useSelector(selectPersonalInfoStatus);
  const getPersonalInfoErrors = useSelector(selectPersonalInfoError);
  const updatePersonalInfoStatus = useSelector(selectUpdatePersonalInfoStatus);
  // #!-- end REDUX HOOKS --!

  // #== Start FETCH INITIAL PERSONAL INFO DATA ==#
  useEffect(() => {
    if (getPersonalInfoStatus === "idle") {
      dispatch(getPersonalInfo());
    }
  }, [dispatch, getPersonalInfoStatus]);
  // #!-- end FETCH INITIAL PERSONAL INFO DATA --!

  // #== Start SETTING THE LOCAL STATE WITH FETCHED DATA ==#
  useEffect(() => {
    if (
      getPersonalInfoStatus === "succeeded" &&
      Array.isArray(getPersonalinfoData.data) &&
      getPersonalinfoData.data.length > 0
    ) {
      setLocalPersonalInfo({
        id: getPersonalinfoData.data[0]._id || "",
        name: getPersonalinfoData.data[0].name || "",
        email: getPersonalinfoData.data[0].email || "",
        number: getPersonalinfoData.data[0].number || "",
      });

      // Show success alert and hide it after 3 seconds
      if (showSucceededUpdateAlert) {
        setTimeout(() => {
          setShowSucceededUpdateAlert(false);
        }, 3000);
      }
    }
  }, [getPersonalInfoStatus, getPersonalinfoData, showSucceededUpdateAlert]);
  // #!-- end SETTING THE LOCAL STATE WITH FETCHED DATA --!

  // #== Start UPDATE INFORMATION MODAL STATE ==#
  const [showUpdateInformationModal, setShowUpdateInformationModal] =
    useState(false);
  const [updatedLocalPersonalInfo, setUpdatedLoacalPersonalInfo] = useState({
    localName: "",
    localEmail: "",
    localNumber: "",
  });

  const handleCloseUpdateModel = () => {
    setShowUpdateInformationModal(false);
    setErrorAlert("");
  };

  const handleShowUpdateModel = () => {
    setUpdatedLoacalPersonalInfo({
      localName: localPersonalInfo.name,
      localEmail: localPersonalInfo.email,
      localNumber: localPersonalInfo.number,
    });

    setShowUpdateInformationModal(true);
  };

  const handleSaveUpdatedpersonalInfo = async () => {
    const { localName, localEmail, localNumber } = updatedLocalPersonalInfo;

    if (!localName || !localEmail || !localNumber) {
      // Validate all required fields
      setErrorAlert("All fields are required.");
      return;
    }

    const updatedPersonalInfoData = {
      name: localName,
      email: localEmail,
      number: localNumber,
    };

    try {
      await dispatch(
        putNewPersonalInfo({
          id: localPersonalInfo.id,
          data: updatedPersonalInfoData,
        })
      ).unwrap();
      handleCloseUpdateModel();
      setShowSucceededUpdateAlert(true); // Show success alert
    } catch (error) {
      setErrorAlert(error.message || "Failed to update personal information."); // Show error message
    }
    dispatch(getPersonalInfo());
  };
  // #!-- end UPDATE INFORMATION MODAL STATE --!

  // #== Start RENDERING PERSONAL INFORMATION COMPONENT ==#
  return (
    <div>
      {updatePersonalInfoStatus === "succeeded" && showSucceededUpdateAlert && (
        <Alert variant="success">
          Personal Informations Updated Successfully
        </Alert>
      )}
      <Container>
        <Row className="personalInformation-Title">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <h3>Personal Informations</h3>
          </Col>
        </Row>

        <Row>
          <Col
            className="personalInformation-Image"
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={4}
          >
            <img
              className="personalInformation-image"
              src={imageim}
              alt="Description"
            />
          </Col>
          <Col className="informations-text" xl={8} lg={8} md={8} sm={8} xs={8}>
            <Row>
              <h4>Name: {localPersonalInfo.name}</h4>
              <h4>Email: {localPersonalInfo.email}</h4>
              <h4>Phone Number: {localPersonalInfo.number}</h4>
            </Row>
            <Row>
              <Col xl={6} lg={6} md={6} sm={6} xs={6}>
                <button
                  onClick={handleShowUpdateModel}
                  className="personalInformation-send"
                >
                  <i className="fa-solid fa-pen-to-square personalInformation-color-icon"></i>
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* #== Start UPDATE PERSONAL INFORMATION MODAL ==# */}
      <Modal show={showUpdateInformationModal} onHide={handleCloseUpdateModel}>
        <Modal.Header closeButton>
          <Modal.Title>Update Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}{" "}
          {/* Show error message */}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Updated Name"
                autoFocus
                value={updatedLocalPersonalInfo.localName}
                onChange={(e) => {
                  setUpdatedLoacalPersonalInfo({
                    ...updatedLocalPersonalInfo,
                    localName: e.target.value,
                  });
                }}
              />

              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Updated Email"
                value={updatedLocalPersonalInfo.localEmail}
                onChange={(e) => {
                  setUpdatedLoacalPersonalInfo({
                    ...updatedLocalPersonalInfo,
                    localEmail: e.target.value,
                  });
                }}
              />
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Updated Phone Number"
                value={updatedLocalPersonalInfo.localNumber}
                onChange={(e) => {
                  setUpdatedLoacalPersonalInfo({
                    ...updatedLocalPersonalInfo,
                    localNumber: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUpdatedpersonalInfo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* #!-- end UPDATE PERSONAL INFORMATION MODAL --! */}
    </div>
  );
};

export default PersonalInformations;
