import React from "react";

import "./../styles/modal.css";

export const modalContent = {
  title: "",
  message: "",
  options: {
    confirmButton: true,
    onConfirm: () => {},
    cancelButton: false,
    onCancel: () => {},
    updateButton: false,
    onUpdate: () => {},
  },
};

export const Modal = ({ title, message, options }) => {
  const defaultOption = {
    ...modalContent.options,
    ...options,
  };

  return (
    <div className="ModalContainer">
      <div className="Modal">
        <div className="Info">
          <h1>{title}</h1>
          <p>{message}</p>
        </div>

        <div className="ActionButtons">
          {defaultOption.cancelButton && (
            <button
              className="BtnCancel Cancel"
              onClick={() => defaultOption.onCancel()}
            >
              Cancel
            </button>
          )}
          {defaultOption.confirmButton && (
            <button
              className="BtnOkay Confirm"
              onClick={() => defaultOption.onConfirm()}
            >
              Okay
            </button>
          )}
          {defaultOption.updateButton && (
            <button
              className="BtnUpdate Update"
              onClick={() => defaultOption.onUpdate()}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
