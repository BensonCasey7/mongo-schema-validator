import React from "react";

import ArrayDisplay from "./ArrayDisplay";
import KeyValueDisplay from "./KeyValueDisplay";

const ObjectNode = (props) => {
  return (
    <>
      {Array.isArray(props.data) ? (
        <ArrayDisplay
          data={props.data}
          schema={props.schema}
          path={props.path}
          updateJson={props.updateJson}
        />
      ) : (
        <KeyValueDisplay
          data={props.data}
          schema={props.schema}
          required={props.required}
          path={props.path}
          updateJson={props.updateJson}
        />
      )}
    </>
  );
};

export default ObjectNode;
