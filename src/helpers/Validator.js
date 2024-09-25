const validate_title = (string) => {
  return /^.{2,20}$/.test(string);
};
const validate_description = (string) => {
  return /^.{10,1000}$/.test(string);
};
const validate_year = (string) => {
  return /^\d{4}$/.test(string);
};

export { validate_title, validate_description, validate_year };
