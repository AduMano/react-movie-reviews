export const DateConverter = (date) => {
  if (date == null) return "";

  return date.split("-")[0];
};
