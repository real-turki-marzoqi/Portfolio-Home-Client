// bootStarp Imports
import { Container, Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

// Components Imports
import imageim from "../images/imageim.png";
import SocialMedia from "../components/Home/SocialMedia";
import AboutMe from '../components/Home/AboutMe'
import Education from '../components/Home/education'
import Services from '../components/Home/Services'
import ContactWithMe from "../components/Home/ContactWithMe";
import Footer from "../components/Footer";


// Personal Info Redux And Selectors Imports
import { selectPersonalInfo, selectPersonalInfoStatus, selectPersonalInfoError,selectUpdatePersonalInfoStatus} from "../redux/features/personalInformations/personalInfoSelectors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPersonalInfo } from "../redux/features/personalInformations/personalInfoThunk";

// Texts Redux And Selectors Imports
import {getTexts} from '../redux/features/texts/textsThunk'
import {selectTexts , selectTextErrors , selectTextsStatus} from '../redux/features/texts/textsSelector'


const Home = () => {

  const [personalInfoLocalState, setPersonalInfoLocalState] = useState({
    name: "",
    email: "",
    number: "",
  });

  const dispatch = useDispatch();
  const personalInfo = useSelector(selectPersonalInfo);
  const status = useSelector(selectPersonalInfoStatus);
  const error = useSelector(selectPersonalInfoError)

  const [texts , setTexts] = useState({
    AboutMe:'' ,Education:"" , Services:''})
  const getTextsData = useSelector(selectTexts)
  const getTextsStatus = useSelector(selectTextsStatus)
  const getTextsErrors = useSelector(selectTextErrors)

  
  const handleError ='Loading Home Page failed'

  useEffect(() => {
    if (status === "idle" && getTextsStatus === 'idle') {
      dispatch(getPersonalInfo());
      dispatch(getTexts());
    }
  }, [getTextsStatus,status, dispatch]);


  useEffect(() => {
    if (status === "succeeded" && getTextsStatus ===  'succeeded') {
      

      if (Array.isArray(personalInfo) && personalInfo.length > 0 && Array.isArray(getTextsData) && getTextsData.length > 0) {
        setPersonalInfoLocalState({
          name: personalInfo[0].name || "",
          email: personalInfo[0].email || "",
          number: personalInfo[0].number || "",
        });

        
        setTexts({
          AboutMe:getTextsData[0].AboutMe,
          Education:getTextsData[0].Education,
          Services:getTextsData[0].Services
        })

      }
     
    }
  }, [status, personalInfo]);




  if (status === "loading")
    return (
      <div style={{ padding: "20PX" }}>
        {" "}
        Loading... <Spinner animation="grow" variant="dark" />
      </div>
    );
  if (status === "failed")
    return (
      <div>
        <Alert variant={"danger"}>Error:{error || handleError} </Alert>
      </div>
    );

  return (
    <>
      <Container>
        <div className="home-main">
          {/* #==START PROFILE IMAGE==# */}
          <Row className="image-main">
            <Col className="" xl={7} lg={7} md={7} sm={8} xs={8}>
              <div className="image-container">
                <img
                  className="profile-Image"
                  src={imageim}
                  alt="Description"
                />
              </div>
            </Col>
            {/* !--END PROFILE IMAGE--! */}

            <Col xl={5} lg={5} md={5} sm={4} xs={4}>
              <Row>
                <SocialMedia />
                {/* #==START NAME TEXT ==# */}
              </Row>
              <Row className="Main-texts">
                <h1>
                  {" "}
                  <span style={{ color: "#f40a5c" }}>Hi</span> I'm{" "}
                  {personalInfoLocalState.name}!
                </h1>
                <h6>Computer Engineer and Full-Stack Web Developer</h6>
              </Row>
            </Col>
          </Row>
          {/* !-- END NAME TEXT --! */}

          {/* #== START TEXTS ==# */}
        </div>
        <Row style={{ marginTop: "2%" }}>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="texts">
            <AboutMe AboutMe={texts.AboutMe}></AboutMe>
          </Col>
        </Row>
        <Row className="texts-main-row">
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className=""></Col>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="texts">
            <Education Education={texts.Education} />
          </Col>
        </Row>
        <Row style={{ marginTop: "2%" }}>
          <Col xl={6} lg={6} md={6} sm={12} xs={12} className="texts">
            <Services Services={texts.Services}></Services>
          </Col>
        </Row>
        {/* !-- End TEXTS ==# */}

        {/* #== START Contact With Me  ==# */}
        <Row className="contact-main-form">
          <Col xl={9} lg={9} md={9} sm={9} xs={9}>
            <ContactWithMe></ContactWithMe>
          </Col>
        </Row>
        {/* !-- End Contact With Me  --! */}
      </Container>
      <Footer
        name={personalInfoLocalState.name}
        email={personalInfoLocalState.email}
        number={personalInfoLocalState.number}
      />
    </>
  );
};
export default Home;
