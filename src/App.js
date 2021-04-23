import React, { useState } from "react";
import "./assets/stylesheets/App.scss";

import Uploader from "./components/Uploader";
import FileFrame from "./components/FileFrame";
import JsonPreview from "./components/JsonPreview";

function App() {
  const [file, setFile] = useState(null);

  return (
    <div className={"page-wrapper"}>
      <div className={"page-wrapper__content"}>
        <div className={"page"}>
          <h1>Mongo Schema Validator</h1>
          <Uploader file={file} setFile={setFile} />
          <FileFrame file={file} />
          {file ? <JsonPreview data={file} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default App;
