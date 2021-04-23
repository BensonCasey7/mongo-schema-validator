import React from "react";

import ObjectNode from "./ObjectNode";

const JsonPreview = (props) => {
  return (
    <div>
      <h3>Previewer</h3>
      <div className={"json-preview"}>
        <ObjectNode data={props.data} />
      </div>
    </div>
  );
};

export default JsonPreview;
