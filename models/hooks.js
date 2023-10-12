export const handleServerError = (error, data, next) => {
  error.status = 400;
  next();
};
