
const mongooseError = (error, data, next) => {
    // console.log('error.name', error.name);
    if (error.name === 'ValidationError') {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      error.status = 400;
      error.message = 'Validation error';
      error.errors = errors;
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const duplicateError = {
        status: 409,
        message: `The ${field} '${error.keyValue[field]}' already exists.`,
      };
      return next(duplicateError);
    }
  
    next(error);
  };
  
  module.exports = mongooseError;