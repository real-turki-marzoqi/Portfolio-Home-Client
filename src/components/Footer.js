import SocialMedia from "./Home/SocialMedia";
import { Row, Col } from "react-bootstrap";

const Footer = ({ name, email, number }) => {
  return (
    <div className="footer">
      <Row className="footer-Row">
        <Col xl={3} lg={3} md={3} sm={3} xs={3}>
          <h6>All rights reserved by {name}©2024 </h6>
        </Col>
        <Col xl={9} lg={9} md={9} sm={9} xs={9}>
          <SocialMedia />

          <Row className="Footer-Email">{email}</Row>

          <Row className="Footer-Email">{number}</Row>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
