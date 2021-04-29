import React, { useEffect, useState } from "react";
import { BsPencil, BsCheck } from "react-icons/bs";

import ObjectNode from "./ObjectNode";
import InvalidData from "./InvalidData";

const KeyValueDisplay = (props) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [objectWideError, setObjectWideError] = useState(false);
  const [objectWideErrorMessage, setObjectWideErrorMessage] = useState("");
  const [data, setData] = useState(props.data);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (typeof data === "object") {
      if (props.required) {
        const difference = props.required.filter(
          (x) => !Object.keys(data).includes(x)
        );
        if (difference.length > 0) {
          setObjectWideError(true);
          setObjectWideErrorMessage(`Missing required fields: ${difference}`);
        }
      }
    } else {
      switch (props.schema?.bsonType) {
        case "int":
          if (!Number.isInteger(data)) {
            setError(true);
            setErrorMessage(`"${data}" is not an integer`);
            break;
          }
          if (props.schema.min) {
            if (data < props.schema.min) {
              setError(true);
              setErrorMessage(
                `"${data}" is less than the defined minimum of ${props.schema.min}`
              );
              break;
            }
          }
          if (props.schema.max) {
            if (data > props.schema.max) {
              setError(true);
              setErrorMessage(
                `"${data}" is greater than the defined maximum of ${props.schema.max}`
              );
              break;
            }
          }
          if (!editing) {
            setError(false);
            setErrorMessage("");
          }
          break;
        case "string":
          if (typeof data !== "string") {
            setError(true);
            setErrorMessage(`"${data}" is not a string`);
            break;
          }
          if (props.schema.pattern) {
            if (!data.match(props.schema.pattern)) {
              setError(true);
              setErrorMessage(
                `"${data}" does not match the pattern ${props.schema.pattern}`
              );
              break;
            }
          }
          if (!editing) {
            setError(false);
            setErrorMessage("");
          }
          break;
        default:
          setError(false);
      }
    }
  }, [data, editing, props.required, props.schema]);

  const handleChange = (event) => {
    setData(event.target.value);
    props.updateJson(props.path, event.target.value);
  };

  return typeof data === "object" ? (
    <>
      {objectWideError ? (
        <InvalidData message={objectWideErrorMessage}>
          {Object.entries(data).map(([key, value]) => {
            return (
              <div key={key}>
                <span className={"json-preview__key"}>{key}:</span>{" "}
                <ObjectNode
                  data={value}
                  schema={props.schema?.[key]}
                  path={props.path.concat({ type: "kv", key: key })}
                  updateJson={props.updateJson}
                />
              </div>
            );
          })}
        </InvalidData>
      ) : (
        <div>
          {Object.entries(data).map(([key, value]) => {
            return (
              <div key={key}>
                <span className={"json-preview__key"}>{key}:</span>{" "}
                <ObjectNode
                  data={value}
                  schema={props.schema?.[key]}
                  path={props.path.concat({ type: "kv", key: key })}
                  updateJson={props.updateJson}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  ) : (
    <>
      {error ? (
        <>
          {editing ? (
            <>
              <input
                type={"text"}
                value={data}
                placeholder={"Username"}
                onChange={handleChange}
              />
              <BsCheck onClick={() => setEditing(false)} />
            </>
          ) : (
            <>
              <InvalidData message={errorMessage} inline={true}>
                {data}
              </InvalidData>
              <BsPencil onClick={() => setEditing(true)} />
            </>
          )}
        </>
      ) : (
        data
      )}
    </>
  );
};

export default KeyValueDisplay;
