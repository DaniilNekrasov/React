export const required = (value) => {
  if (value) return undefined;
  else return "field required";
};

export const maxLengthCreator = (maxLength) => (value) => {
  if (value.length > maxLength) return `max length is ${maxLength} symbols`;
  else return undefined;
};
