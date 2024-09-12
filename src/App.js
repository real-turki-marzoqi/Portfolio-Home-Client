// Home Page and Home Styles Imports
import "./Styles/Home/home.css";
import "./Styles/Home/SocialMedia.css";
import "./Styles/Home/texts.css";
import "./Styles/Home/ProfileImage.css";
import "./Styles/Home/ContactWithMe.css";
import Home from "./Pages/Home";

//imports Admin
import Admin from './Pages/Admin'
import './Styles/Admin/PersonalInfoemations.css'
import './Styles/Admin/admin.css'
import './Styles/Admin/texts.css'
import './Styles/Admin/messages.css'

// Utility Components and Styles Imports
import NavBar from "./components/NavBar";
import "./Styles/utility/Footer.css";
import "./Styles/utility/NavBar.css";

import './Styles/utility/SideBar.css'

// ROUTER
import { Route, Routes,  } from "react-router-dom";

function App() {
  return (
    <div className="main">
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/-admin-yonitci-/*" element={<Admin/>}/>
    </Routes>
   {/*  <Footer /> */}
  </div>
  );
}

export default App;
