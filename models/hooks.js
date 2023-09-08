export const hookError = (error, data, next) => {
  error.status = 400;
  next();
};

// export default hookError;
