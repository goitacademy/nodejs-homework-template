export const response = (res, statusCode, ok, data, message) => {
  res.status(statusCode).json({
    ok,
    data,
    message,
  });
};
