const errorHandler = (condition, status, message) => {
    if (condition) {
      const error = new Error(message);
      error.status = status;
      throw error;
    }
  };
  
  module.exports = errorHandler;