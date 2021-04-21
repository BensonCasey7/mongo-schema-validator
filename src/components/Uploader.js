import React from 'react';

const Uploader = (props) => {

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      props.setFile(e.target.result);
    };
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      <br />
      {"uploaded file content -- " + props.file}
    </>
  );
}

export default Uploader
