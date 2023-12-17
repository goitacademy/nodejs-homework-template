import { errorMessages } from "../const/HttpErrorMessages.js";

export class HttpError extends Error {
  constructor(
    statusCode = 500,
    message = errorMessages[statusCode] || errorMessages.default
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}
