import React, { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretRightFill } from "react-icons/bs";

import ObjectNode from "./ObjectNode";

const ArrayDisplay = (props) => {
  const [exploded, setExploded] = useState(true);

  return exploded ? (
    <>
      <span className={"json-preview--center"}>
        <BsFillCaretDownFill
          className={"json-preview__exploder"}
          onClick={() => {
            setExploded(false);
          }}
        />
        Array ({props.data.length} items)
      </span>
      <div className={"json-preview__nest-container"}>
        {props.data.map((item, index) => {
          return (
            <div key={index} className={"json-preview__nest-item"}>
              <ObjectNode data={item} schema={props.schema?.properties} />
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
