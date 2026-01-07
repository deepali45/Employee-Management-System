import React from "react";
import LogoutButton from "../common/LogoutButton";
import "../../assets/styles/dashboard.css";

const Header = ({ title }) => {
  return (
    <div className="header">
      <h3>{title}</h3>
      <LogoutButton />
    </div>
  );
};

export default Header;
