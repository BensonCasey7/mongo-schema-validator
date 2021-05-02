import React, { useState } from "react";
import "./assets/stylesheets/App.scss";

import Uploader from "./components/Uploader";
import FileFrame from "./components/FileFrame";
import JsonPreview from "./components/JsonPreview";
import nobel from "./nobel_prizes_incorrect.json";
import nobel_schema from "./nobel_prizes_schema.json";

function App() {
  const [file, setFile] = useState([]);
  const [schema, setSchema] = useState({});

  const updateJson = (path, data) => {
    let temp = file;
    let formattedPath = "";
    path.forEach((node) => {
      formattedPath = `${formattedPath}[${
        node.type === "array" ? node.key : `'${node.key}'`
      }]`;
    });
    eval(`temp${formattedPath} = '${data}'`);
    setFile(temp);
    console.log(eval(`file${formattedPath}`));
  };

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
            mockDataText={"Use Nobel Prize Data"}
          />
          <FileFrame file={file} />
          <h2>Schema File</h2>
          <Uploader
            file={schema}
            setFile={setSchema}
            mockData={() => {
              setSchema(nobel_schema);
            }}
            mockDataText={"Use Nobel Prize Schema"}
          />
          <FileFrame file={schema} />
          {file ? (
            <JsonPreview data={file} schema={schema} updateJson={updateJson} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
