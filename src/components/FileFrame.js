import React, { useEffect } from "react";

const FileFrame = (props) => {
  useEffect(() => {
    console.log(props.file);
  }, [props.file]);

  return (
    <div className={"json-viewer"}>{JSON.stringify(props.file, null, 2)}</div>
  );
};

export default FileFrame;
