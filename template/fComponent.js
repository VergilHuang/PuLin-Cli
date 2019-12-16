import React from 'react';

function fComponent(props){
  let eventHandler = (e) => {
    //do something...
  };
  return <div className="class" {...props}>I am a non-status component</div>;
}

export default fComponent;