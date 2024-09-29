import { useRef, useState } from "react";

// dispatch is needed for updating the state,
// modalContent is needed and setModal()
export const useHandleInput = (dispatch, modalContent, state, setModal) => {
  // useRef
  const fileInput = useRef();
  const [image, setImage] = useState(state.image);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (file && validTypes.includes(file.type)) {
      dispatch({ type: "image_file", value: file, imageState: setImage });
    } else {
      setModal(true);

      modalContent.title = "Invalid Image";
      modalContent.message = `The Image you selected is invalid.`;

      modalContent.options.confirmButton = true;
      modalContent.options.onConfirm = () => {
        fileInput.current.value = "";
        setModal(false);
      };
    }
  };

  const handleInputs = (e) => {
    dispatch({
      type: e.target.getAttribute("name"),
      value:
        e.target.value != null
          ? e.target.value
          : e.target.getAttribute("data-value"),
    });
  };

  return {
    handleFileChange,
    handleInputs,
    setImage,
    fileInput,
    image,
  };
};
