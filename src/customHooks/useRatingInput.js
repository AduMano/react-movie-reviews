import { useCallback } from "react";

// State is required
export const useRatingInput = (state) => {
  const handleFill = useCallback((e) => {
    const parent = e.target.parentNode;
    let children = parent.childNodes;
    let value = 0;

    try {
      value = parseInt(e.target.getAttribute("data-value"));
      children.forEach((node, index) => {
        if (index + 1 <= value) {
          node.innerText = "★";
        } else {
          node.innerText = "☆";
        }
      });
    } catch (error) {
      return;
    }
  });

  const handleDefault = useCallback((e) => {
    const parent = e.target.parentNode;
    let children = parent.childNodes;
    let value = state.rating;

    children.forEach((node, index) => {
      if (index + 1 <= value) {
        node.innerText = "★";
      } else {
        node.innerText = "☆";
      }
    });
  });

  return {
    handleFill,
    handleDefault,
  };
};
