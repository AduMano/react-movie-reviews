import React from "react";

export const FormGroup = ({ type, label, value, onChange, name, options }) => {
  switch (type) {
    case "text":
      return (
        <div className="FormGroup">
          <label>{label}: </label>
          <input type="text" value={value} onChange={onChange} name={name} />
        </div>
      );

    case "textarea":
      return (
        <div className="FormGroup">
          <label>{label}: </label>
          <textarea onChange={onChange} value={value} name={name} />
        </div>
      );

    case "number":
      return (
        <div className="FormGroup">
          <label>{label}: </label>
          <input type="number" value={value} onChange={onChange} name={name} />
        </div>
      );

    case "date":
      return (
        <div className="FormGroup">
          <label>{label}: </label>
          <input type="date" value={value} onChange={onChange} name={name} />
        </div>
      );

    case "category":
      return (
        <div className="FormGroup">
          <label>{label}: </label>
          <select value={value} onChange={onChange} name={name}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
  }
};
