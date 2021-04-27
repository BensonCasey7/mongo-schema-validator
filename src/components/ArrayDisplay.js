import React, { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretRightFill } from "react-icons/bs";

import ObjectNode from "./ObjectNode";

const ArrayDisplay = (props) => {
  const [exploded, setExploded] = useState(false);

  return exploded ? (
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
    <span className={"json-preview--center"}>
      <BsFillCaretRightFill
        className={"json-preview__exploder"}
        onClick={() => {
          setExploded(true);
        }}
      />{" "}
      Array ({props.data.length} items)
    </span>
  );
};

export default ArrayDisplay;
