import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ModalContent, deleteMovie() and setModal() is required from Home, Detail and from Context
export const useConfirmRemoval = (
  modalContent,
  setModal,
  deleteMovie,
  redirectToHome
) => {
  const navigate = useNavigate();

  const removeMovie = useCallback((e) => {
    const movieID = parseInt(e.target.getAttribute("data-id"));
    const message = e.target.getAttribute("data-name");

    modalContent.title = `Delete Movie`;
    modalContent.message = `Are you sure you want to delete ${message}?`;
    modalContent.options.cancelButton = true;
    modalContent.options.confirmButton = true;
    modalContent.options.onCancel = () => {
      setModal(false);
    };
    modalContent.options.onConfirm = async () => {
      await setModal(false);

      modalContent.title = `Successfully Deleted`;
      modalContent.message = `Movie ${message} deleted.`;
      modalContent.options.cancelButton = false;
      modalContent.options.confirmButton = true;
      modalContent.options.onConfirm = () => {
        deleteMovie(movieID);
        setModal(false);

        redirectToHome ? navigate("/") : false;
      };

      await setModal(true);
    };

    setModal(true);
  });

  return {
    removeMovie,
  };
};
