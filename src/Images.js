import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Images.css";

function Images({ images }) {
  if (!images?.length) return null;

  const { filename, url } = images[0];
  return (
    <div className="Images">
      <img className="Image" alt={filename} src={url} />
    </div>
  );
}

export default Images;
