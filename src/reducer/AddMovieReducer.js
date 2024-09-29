const initialStates = {
  image_file: null,
  image: "/MovieTemplate.png",
  title: "",
  description: "",
  category: "Action",
  rating: "1",
  year: "2024",
  id: 0,
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

      action.imageState("http://localhost:3000/add");
      return { ...state, image_file: null };

    case "title":
      return { ...state, title: action.value };

    case "description":
      return { ...state, description: action.value };

    case "category":
      return { ...state, category: action.value };

    case "rating":
      return { ...state, rating: action.value };

    case "year":
      return { ...state, year: action.value };

    case "id":
      return { ...state, id: parseInt(action.value) };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export { initialStates, reducer };
