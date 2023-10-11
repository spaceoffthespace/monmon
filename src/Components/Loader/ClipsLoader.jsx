import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './ClipsLoader.css';  // Importing a CSS file to style the loader

const LoadLoader = () => {
  return (
    <div className="loader-container">
      <ClipLoader color="#123abc" size={50} />
    </div>
  );
};

export default LoadLoader;
