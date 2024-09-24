import React from "react";
import { Link } from "react-router-dom";

import "./../styles/navigation.css";

export const Navigation = () => {
  return (
    <nav>
      <Link to="/">
        <h2>Movie Reviews</h2>
      </Link>

      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/add"}>Add Movie</Link>
        </li>
      </ul>
    </nav>
  );
};
