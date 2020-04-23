import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";

const Dasboard = ({ children }) => {
  return (
    <div>
      <h3>Dasboard layout</h3>
      <Header />
      {children}
    </div>
  );
};

Dasboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Dasboard;
