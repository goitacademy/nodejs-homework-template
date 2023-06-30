const isConflict = ({ name, code }) => name === 'MongoServerError' && code === 11000;

const handleErrors = (error, data, next) => {
  const { name, code } = error;
  error.status = isConflict({ name, code }) ? 409 : 400;
  next();
};

module.exports = handleErrors;
