import React, { useEffect, useState } from "react";

import ObjectNode from "./ObjectNode";
import InvalidData from "./InvalidData";

const KeyValueDisplay = (props) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [objectWideError, setObjectWideError] = useState(false);
  const [objectWideErrorMessage, setObjectWideErrorMessage] = useState("");

  useEffect(() => {
    if (typeof props.data === "object") {
      if (props.required) {
        const difference = props.required.filter(
          (x) => !Object.keys(props.data).includes(x)
        );
        if (difference.length > 0) {
          setObjectWideError(true);
          setObjectWideErrorMessage(`Missing required fields: ${difference}`);
        }
      }
    } else {
      switch (props.schema?.bsonType) {
        case "int":
          if (!Number.isInteger(props.data)) {
            setError(true);
            setErrorMessage(`"${props.data}" is not an integer`);
            break;
          }
          if (props.schema.min) {
            if (props.data < props.schema.min) {
              setError(true);
              setErrorMessage(
                `"${props.data}" is less than the defined minimum of ${props.schema.min}`
              );
              break;
            }
          }
          if (props.schema.max) {
            if (props.data > props.schema.max) {
              setError(true);
              setErrorMessage(
                `"${props.data}" is greater than the defined maximum of ${props.schema.max}`
              );
              break;
            }
          }
          break;
        case "string":
          if (typeof props.data !== "string") {
            setError(true);
            setErrorMessage(`"${props.data}" is not a string`);
            break;
          }
          if (props.schema.pattern) {
            if (!props.data.match(props.schema.pattern)) {
              setError(true);
              setErrorMessage(
                `"${props.data}" does not match the pattern ${props.schema.pattern}`
              );
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
    <>
      {objectWideError ? (
        <InvalidData message={objectWideErrorMessage}>
          {Object.entries(props.data).map(([key, value]) => {
            return (
              <div key={key}>
                <span className={"json-preview__key"}>{key}:</span>{" "}
                <ObjectNode data={value} schema={props.schema?.[key]} />
              </div>
            );
          })}
        </InvalidData>
      ) : (
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
      )}
    </>
  ) : (
    <>
      {error ? (
        <InvalidData message={errorMessage} inline={true}>
          {props.data}
        </InvalidData>
      ) : (
        props.data
      )}
    </>
  );
};

export default KeyValueDisplay;
