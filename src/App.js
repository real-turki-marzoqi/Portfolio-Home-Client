// Home Page and Home Styles Imports
import "./Styles/Home/home.css";
import "./Styles/Home/SocialMedia.css";
import "./Styles/Home/texts.css";
import "./Styles/Home/ProfileImage.css";
import "./Styles/Home/ContactWithMe.css";
import Home from "./Pages/Home";


// Utility Components and Styles Imports
import NavBar from "./components/NavBar";
import "./Styles/utility/Footer.css";
import "./Styles/utility/NavBar.css";


// ROUTER
import { Route, Routes,  } from "react-router-dom";

function App() {
  return (
    <div className="main">
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
    
    </Routes>
   {/*  <Footer /> */}
  </div>
  );
}

export default App;
