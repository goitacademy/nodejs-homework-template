import { setErrorResponse } from './setResponse.js';

export const handleDuplicateKeyError = ({ keyValue }, res) => {
  const field = Object.keys(keyValue);

  res.status(409).json(setErrorResponse(409, ` ${field} already exists.`));
};
