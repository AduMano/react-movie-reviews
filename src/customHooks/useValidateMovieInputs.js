// Requires the validation helper, the modal and the state from the reducer
// setType is also required
export const useValidateMovieInputs = (
  validate_title,
  validate_description,
  validate_year,
  setModal,
  modalContent,
  state,
  setType
) => {
  const validate = () => {
    let title = validate_title(state.title);
    let description = validate_description(state.description);
    let year = validate_year(state.year);
    let movieImage = state.image == "/MovieTemplate.png" ? false : true;

    if (title && description && year && (movieImage || setType == "update")) {
      return true;
    }

    modalContent.title = "Invalid Input";
    modalContent.message = `${
      !title ? "Movie Title must be 2 - 20 characters." : ""
    } ${
      !description ? "\nMovie Description must be 10 - 1000 characters." : ""
    } ${!year ? "\nYear must be 4 digits and number only." : ""} ${
      !movieImage && setType == "add" ? "\nPlease attach an image." : ""
    }`;

    modalContent.options.confirmButton = true;
    modalContent.options.onConfirm = () => {
      setModal(false);
    };

    return false;
  };

  return { validate };
};
