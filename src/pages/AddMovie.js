import React, { useEffect } from "react";

export const AddMovie = () => {
  useEffect(() => {
    document.title = "Add Movie";
  }, []);

  return <div>AddMovie</div>;
};
