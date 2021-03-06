import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Images.css";

const getOrigin = (box) => ({
  x: `${box.xmin * 100}%`,
  y: `${box.ymin * 100}%`,
});

const getSize = (box) => ({
  width: `${(box.xmax - box.xmin) * 100}%`,
  height: `${(box.ymax - box.ymin) * 100}%`,
});

function Images({ images }) {
  const [boxes, setBoxes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = images[selectedIndex];
      const result = await axios(
        `https://cully-api.herokuapp.com/images/${id}/faces`
      );

      const boxJSON = JSON.parse(result.data);
      setBoxes(boxJSON.data);
    };
    fetchData();
  }, [images, selectedIndex]);

  const { filename, url } = images[selectedIndex];

  return (
    <div>
      <div className="Images">
        {boxes.map((box) => {
          const { x, y } = getOrigin(box);
          const { width, height } = getSize(box);

          return (
            <div
              key={box.id}
              style={{ left: x, top: y, width, height }}
              className="Box"
            ></div>
          );
        })}
        <img className="Image" alt={filename} src={url} />
      </div>
      <div className="Controls">
        <button
          href="#"
          onClick={() => {
            setSelectedIndex(Math.max(0, selectedIndex - 1));
          }}
        >
          Previous
        </button>
        <p>{filename}</p>
        <button
          onClick={() => {
            setSelectedIndex(Math.min(images.length - 1, selectedIndex + 1));
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Images;
