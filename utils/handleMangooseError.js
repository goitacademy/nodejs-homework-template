const handleMangooseError = (error, data, next) => {
  const { name, code } = error;
  // console.log(name);
  // console.log(code)
  // const status = (name === "MangoServerError" && code === 11000) ? 409 : 400;
  const status = (name === "MangoServerError" && code === 11000) ? 400 : 409;
  error.status = status;
  next();
};

module.exports = handleMangooseError;
