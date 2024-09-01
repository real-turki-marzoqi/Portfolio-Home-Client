import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="SideBar-main">
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to="/-admin-yonitci-/-profile-personal-informations-"
      >
        <h4 className="SideBar-Content">Profile</h4>
      </Link>

      <hr className="SideBar-hr" />

      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to="/-admin-yonitci-/-texts-"
      >
        <h4 className="SideBar-Content">Texts</h4>
      </Link>

      <hr className="SideBar-hr" />

      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to="/-admin-yonitci-/-messages-"
      >
        <h4 className="SideBar-Content">messages</h4>
      </Link>

    
     
    </div>
  );
};

export default SideBar;
