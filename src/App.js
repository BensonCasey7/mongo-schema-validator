import React, { useState } from "react";
import "./assets/stylesheets/App.scss";

import Uploader from "./components/Uploader";
import FileFrame from "./components/FileFrame";
import JsonPreview from "./components/JsonPreview";
import nobel from "./nobel_prizes_incorrect_shortened.json";
import nobel_schema from "./nobel_prizes_schema.json";

function App() {
  const [file, setFile] = useState([]);
  const [schema, setSchema] = useState({});

  return (
    <div className={"page-wrapper"}>
      <div className={"page-wrapper__content"}>
        <div className={"page"}>
          <h1>Mongo Schema Validator</h1>
          <h2>Data File</h2>
          <Uploader
            file={file}
            setFile={setFile}
            mockData={() => {
              setFile(nobel);
            }}
            mockDataText={"Mock Nobel Prize Data"}
          />
          <FileFrame file={file} />
          <h2>Schema File</h2>
          <Uploader
            file={schema}
            setFile={setSchema}
            mockData={() => {
              setSchema(nobel_schema);
            }}
            mockDataText={"Mock Nobel Prize Schema"}
          />
          <FileFrame file={schema} />
          {file ? <JsonPreview data={file} schema={schema} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default App;
