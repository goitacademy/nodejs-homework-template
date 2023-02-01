const isConflict = ({ name, code }) => {
  return name === 'MongoServerError' && code === 11000;
};

const handleErrors = (error, data, next) => {
  error.status = isConflict(error) ? 409 : 400;

  next();
};

module.exports = handleErrors;
