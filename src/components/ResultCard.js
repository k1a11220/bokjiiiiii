import React from "react";

const ResultCard = ({ title, ministry, details }) => {
  return (
    <div className="result-card">
      <div>
        <ul>
          <li>
            <h3>{title}</h3>
          </li>
          <li>
            <h3>{ministry}</h3>
          </li>
        </ul>
        <h4 className="result-description">{details}</h4>
      </div>
    </div>
  );
};

export default ResultCard;
