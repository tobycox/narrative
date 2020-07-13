import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Images.css";

const WIDTH = 800;

const getOrigin = (box) => ({ x: box.xmin * WIDTH, y: box.ymin * WIDTH });
const getSize = (box) => ({
  width: box.xmax * WIDTH - getOrigin(box).x,
  height: box.xmax * WIDTH - getOrigin(box).y,
  y: box.ymin * WIDTH,
});

function Images({ images }) {
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = images[0];
      const result = await axios(
        `https://cully-api.herokuapp.com/images/${id}/faces`
      );

      const boxJSON = JSON.parse(result.data);
      setBoxes(boxJSON.data);
    };
    fetchData();
  }, [images]);

  const { filename, url } = images[0];

  console.log(boxes);
  return (
    <div className="Images">
      {boxes.map((box) => {
        const { x, y } = getOrigin(box);
        console.log(x, y);
        return (
          <div key={box.id} style={{ left: x, top: y }} className="Box"></div>
        );
      })}
      <img className="Image" alt={filename} src={url} />
    </div>
  );
}

export default Images;
