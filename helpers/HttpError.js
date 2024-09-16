import { HTTP_STATUS_TEXT } from "../constants/index.js";

export const HttpError = (status, message = HTTP_STATUS_TEXT[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
