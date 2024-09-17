const handleMogooseError = (error, data, next) => {
    console.log(error);
    next();
  };
 
  module.exports = handleMogooseError