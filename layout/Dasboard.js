import React from "react";
import PropTypes from "prop-types";

const Dasboard = ({ children }) => {
  return (
    <div>
      <h3>Dasboard layout</h3>
      {children}
    </div>
  );
};

Dasboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Dasboard;
