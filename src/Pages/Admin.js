import React from "react";
import SideBar from "../components/SideBar";
import { Col, Container, Row } from "react-bootstrap";
import PersonalInformations from "../components/Admin/PersonalInformations";
import { Route, Routes } from "react-router-dom";
import Texts from "../components/Admin/texts";
import Messages from "../components/Admin/messages";

const admin = () => {
  return (
    <Container className="admin-main">
      <div>
        <Row>
          <Col xl={2} lg={2} md={2} sm={3} xs={3}>
            <SideBar />
          </Col>

          <Col xl={10} lg={10} md={10} sm={9} xs={9}>
            <Routes>
              <Route

                path="/-profile-personal-informations-"
                element={<PersonalInformations />}
              />
              <Route path="/-texts-" element={<Texts />} />

              <Route path="/-messages-" element={<Messages />} />

            </Routes>

           
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default admin;
