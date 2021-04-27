import React from "react";

import ObjectNode from "./ObjectNode";

const KeyValueDisplay = (props) => {
  return typeof props.data === "object" ? (
    <div>
      {Object.entries(props.data).map(([key, value]) => {
        return (
          <div>
            <span className={"json-preview__key"}>{key}:</span>{" "}
            <ObjectNode data={value} />
          </div>
        );
      })}
    </div>
  ) : (
    <>{props.data}</>
  );
};

export default KeyValueDisplay;
