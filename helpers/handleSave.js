const hendleSave = (error, data, nrxt) => {
  error.status = 400;
  next();
};
module.exports = hendleSave;