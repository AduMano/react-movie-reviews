import React, { useState, useEffect } from "react";

export const Image = ({ src, title, selector }) => {
  const [image, setImage] = useState(src);

  useEffect(() => {
    setImage(src);
  }, [image]);

  return <img className={selector} src={image} alt={title} />;
};
