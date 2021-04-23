import React from "react";

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

  return (
    <>
      <input type="file" onChange={handleChange} />
    </>
  );
};

export default Uploader;
