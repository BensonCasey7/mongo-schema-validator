import React, { useState } from "react";

const InvalidData = (props) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`alert alert--error ${props.inline ? "alert--inline" : ""}`}
      onMouseOver={() => {
        setActive(true);
      }}
      onMouseOut={() => {
        setActive(false);
      }}
    >
      {props.children}
      <div className={`alert__popup ${active ? "alert__popup--active" : ""}`}>
        {props.message}
      </div>
    </div>
  );
};

export default InvalidData;
