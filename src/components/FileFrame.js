import React from "react";

const FileFrame = (props) => {
  return (
    <div className={"json-viewer"}>{JSON.stringify(props.file, null, 2)}</div>
  );
};

export default FileFrame;
