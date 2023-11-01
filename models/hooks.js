import { HTTP_STATUS } from "../constants/index.js";
import { format } from "../helpers/index.js";

import {
  parseValidationErrorMessage,
  parseDupKeyErrorMessage,
} from "../helpers/mongoDb.js";

const ERR_CODE_DUPLICATE_KEY = 11000;

export const handlePostSaveError = (err, data, next) => {
  switch (err.name) {
    case "ValidationError":
      err.message = parseValidationErrorMessage(err.message);
      err.status = HTTP_STATUS.badRequest;
      break;

    case "MongoServerError":
      if (err.code === ERR_CODE_DUPLICATE_KEY) {
        const dupKey = parseDupKeyErrorMessage(err.message);
        err.message = `A contact with the same ${dupKey} already exists`;
        err.status = HTTP_STATUS.conflict;
      }
  }
  next();
};

export const handlePreUpdateValidate = function (next) {
  this.options.runValidators = true;
  next();
};

export const handlePreSaveFormatting = function (next) {
  Object.entries(format).forEach(([key, formatter]) => {
    this[key] = formatter(this[key]);
  });
  next();
};
