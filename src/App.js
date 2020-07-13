import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Images from "./Images.js";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios("https://cully-api.herokuapp.com/images");

      const imagesJSON = JSON.parse(result.data);
      setImages(imagesJSON.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (images.length === 0) {
      return <div>No images</div>;
    } else {
      return <Images images={images} />;
    }
  };
  return (
    <div className="App">
      <h1>The designs were shit anyway</h1>
      {renderContent()}
    </div>
  );
}

export default App;
