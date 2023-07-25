export default (error, data, next) => {
  error.status = 400;
  next();
};
