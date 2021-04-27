import React, { useEffect, useState } from "react";

import ObjectNode from "./ObjectNode";

const KeyValueDisplay = (props) => {
  const [error, setError] = useState(false);
  const [objectWideError, setObjectWideError] = useState(false);

  useEffect(() => {
    if (typeof props.data === "object") {
      if (props.required) {
        const difference = props.required.filter(
          (x) => !Object.keys(props.data).includes(x)
        );
        setObjectWideError(difference.length > 0);
      }
    } else {
      switch (props.schema?.bsonType) {
        case "int":
          if (!Number.isInteger(props.data)) {
            setError(true);
            break;
          }
          if (props.schema.min) {
            if (props.data < props.schema.min) {
              setError(true);
              break;
            }
          }
          if (props.schema.max) {
            if (props.data > props.schema.max) {
              setError(true);
              break;
            }
          }
          break;
        case "string":
          if (typeof props.data !== "string") {
            setError(true);
            break;
          }
          if (props.schema.pattern) {
            if (!props.data.match(props.schema.pattern)) {
              setError(true);
              break;
            }
          }
          break;
        default:
          setError(false);
      }
    }
  }, [props.data, props.required, props.schema]);

  return typeof props.data === "object" ? (
    <div className={objectWideError ? "json-preview__value--error" : ""}>
      {Object.entries(props.data).map(([key, value]) => {
        return (
          <div key={key}>
            <span className={"json-preview__key"}>{key}:</span>{" "}
            <ObjectNode data={value} schema={props.schema?.[key]} />
          </div>
        );
      })}
    </div>
  ) : (
    <span
      className={error ? "json-preview__value json-preview__value--error" : ""}
    >
      {props.data}
    </span>
  );
};

export default KeyValueDisplay;
