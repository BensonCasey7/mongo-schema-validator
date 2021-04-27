import React, { useEffect, useState } from "react";

import ObjectNode from "./ObjectNode";

const KeyValueDisplay = (props) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof props.data === "object") {
      return;
    }

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
      default:
        setError(false);
    }
  }, [props.data, props.schema]);

  return typeof props.data === "object" ? (
    <div>
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
