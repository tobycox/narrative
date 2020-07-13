import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Images from './Images.js';

function App() {
  const [data, setData] = useState({ hits: [] });

  useEffect(async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
  }, []);

  return (
    <div className="App">
      <Images images={data} />
    </div>
  );
}

export default App;
