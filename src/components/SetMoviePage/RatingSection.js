export const RatingSection = ({
  handleFill,
  handleDefault,
  handleInputs,
  state,
}) => {
  return (
    <div className="ratings">
      <i
        data-value="1"
        name="rating"
        onMouseEnter={handleFill}
        onMouseLeave={handleDefault}
        onClick={handleInputs}
      >
        ★
      </i>
      {[...Array(4)].map((elem, index) => (
        <i
          key={index}
          data-value={index + 2}
          name="rating"
          onMouseEnter={handleFill}
          onMouseLeave={handleDefault}
          onClick={handleInputs}
        >
          {index + 2 <= state.rating ? "★" : "☆"}
        </i>
      ))}
    </div>
  );
};
