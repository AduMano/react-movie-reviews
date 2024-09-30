const validate_title = (string) => {
  return /^.{2,50}$/.test(string);
};
const validate_description = (string) => {
  return /^.{10,1000}$/.test(string);
};
const validate_year = (string) => {
  const inputDate = new Date(string);

  const today = new Date();
  today.setHours(24, 0, 0, 0);

  return inputDate <= today;
};

export { validate_title, validate_description, validate_year };
