import React from "react";

import nobel from "../nobel_prizes_incorrect.json";

const Uploader = (props) => {
  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      const file = JSON.parse(e.target.result);
      console.log(file);
      props.setFile(file);
    };
  };

  const mockData = () => {
    props.setFile(nobel);
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      <button onClick={mockData}>Mock Nobel Prize Data</button>
    </>
  );
};

export default Uploader;
