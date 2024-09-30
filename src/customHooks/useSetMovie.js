import { useNavigate } from "react-router-dom";

// addMovies, updateMovies

// Data Context (Not the use Context) and setType is required
// MovieCount and State is required
// setModal and modalCOntent is required
// ID and Image is required
export const useSetMovie = (addMovies, updateMovies) => {
  const navigate = useNavigate();

  const postMovie = (
    data,
    setType,
    movieCount,
    state,
    setModal,
    modalContent,
    id,
    image
  ) => {
    switch (setType) {
      case "add":
        data.image_url = state.image;

        if (addMovies(data)) {
          modalContent.title = "Successfully Added";
          modalContent.message = `Movie "${state.title} - ${state.year}" Added.`;

          modalContent.options.confirmButton = true;
          modalContent.options.onConfirm = () => {
            setModal(false);
            navigate("/");
          };

          setModal(true);
        }
        break;
      case "update":
        data.image_url =
          state.image == "/MovieTemplate.png" ? image : state.image;

        if (updateMovies(data, id)) {
          modalContent.title = "Successfully Updated";
          modalContent.message = `Movie "${state.title} - ${state.year}" Updated.`;

          modalContent.options.confirmButton = true;
          modalContent.options.onConfirm = () => {
            setModal(false);
            navigate("/");
          };

          setModal(true);
        }
        break;
    }
  };

  return { postMovie };
};
