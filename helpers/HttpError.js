import codesList from "./codes.js";

const HttpError = (status, message = codesList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
