import React from "react";

const ObjectNode = (props) => {
  return (
    <>
      {Array.isArray(props.data) ? (
        <div className={"json-preview__nest-container"}>
          <div>
            {props.data.map((item) => {
              return (
                <div>
                  <ObjectNode data={item} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {typeof props.data === "object" ? (
            <div>
              {Object.entries(props.data).map(([key, value]) => {
                return (
                  <div>
                    {key}: <ObjectNode data={value} />
                  </div>
                );
              })}
            </div>
          ) : (
            <>{props.data}</>
          )}
        </>
      )}
    </>
  );
};

export default ObjectNode;
