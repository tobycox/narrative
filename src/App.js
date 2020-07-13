import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Images from "./Images.js";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios("https://cully-api.herokuapp.com/images");

      const images = JSON.parse(result.data);
      setData(images.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {isLoading ? <div>Loading</div> : <Images images={data} />}
    </div>
  );
}

export default App;
