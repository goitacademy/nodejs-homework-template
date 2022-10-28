const hendleSave = (error, data, nrxt) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next();
};
module.exports = hendleSave;
