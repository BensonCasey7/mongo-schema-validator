import React, { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretRightFill } from "react-icons/bs";

const ObjectNode = (props) => {
  const [exploded, setExploded] = useState(false);

  return (
    <>
      {Array.isArray(props.data) ? (
        <>
          {exploded ? (
            <>
              <span className={"json-preview--center"}>
                <BsFillCaretDownFill
                  className={"json-preview__exploder"}
                  onClick={() => {
                    setExploded(false);
                  }}
                />{" "}
                Array ({props.data.length} items)
              </span>
              <div className={"json-preview__nest-container"}>
                {props.data.map((item) => {
                  return (
                    <div className={"json-preview__nest-item"}>
                      <ObjectNode data={item} />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <span className={"json-preview--center"}>
                <BsFillCaretRightFill
                  className={"json-preview__exploder"}
                  onClick={() => {
                    setExploded(true);
                  }}
                />{" "}
                Array ({props.data.length} items)
              </span>
            </>
          )}
        </>
      ) : (
        <>
          {typeof props.data === "object" ? (
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
          )}
        </>
      )}
    </>
  );
};

export default ObjectNode;
