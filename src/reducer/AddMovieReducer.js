const initialStates = {
  image_file: null,
  image:
    "https://m.media-amazon.com/images/M/MV5BZGVjNmViZDUtOTYzNi00ODVjLWFkODgtZTJiM2I1NTRlYTNkXkEyXkFqcGc@._V1_.jpg",
  title: "",
  description: "",
  category: "Action",
  rating: "3",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "image_file":
      if (action.value) {
        const reader = new FileReader();
        const newData = { ...state };

        reader.onload = (e) => {
          newData.image_file = action.value;
          newData.image = e.target.result;
          action.imageState(e.target.result);
        };

        reader.readAsDataURL(action.value);
        return newData;
      }
      action.imageState(
        "https://m.media-amazon.com/images/M/MV5BZGVjNmViZDUtOTYzNi00ODVjLWFkODgtZTJiM2I1NTRlYTNkXkEyXkFqcGc@._V1_.jpg"
      );
      return { ...state };

    case "title":
      return { ...state, title: action.value };

    case "description":
      return { ...state, description: action.value };

    case "category":
      return { ...state, category: action.value };

    case "rating":
      return { ...state, rating: action.value };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export { initialStates, reducer };
