import React from "react";

import ArrayDisplay from "./ArrayDisplay";
import KeyValueDisplay from "./KeyValueDisplay";

const ObjectNode = (props) => {
  return (
    <>
      {Array.isArray(props.data) ? (
        <ArrayDisplay data={props.data} />
      ) : (
        <KeyValueDisplay data={props.data} />
      )}
    </>
  );
};

export default ObjectNode;
