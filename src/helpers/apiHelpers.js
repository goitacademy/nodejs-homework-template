const { Nodejs55Error } = require('./errors');

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error instanceof Nodejs55Error) {
    return res.status(error.status).json({ message: error.message });
  }
  
  res.status(500).json({ message: error.message });
};  

module.exports = {
  asyncWrapper,
  errorHandler,
};