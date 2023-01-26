const errorHandler = (error) => {
  if (error.name === "CastError") {
    error.status = 404;
    error.message = `contact with id:${error.value} not found`;
    return error;
  }
  if (error.code === 11000) {
    console.log(error.keyValue.name);
    error.status = 409;

    if (error.keyValue.name) {
      error.message = `The contact with name: ${error.keyValue.name} already exist, add someone new please`;
    }
    if (error.keyValue.email) {
      error.message = `The contact with email: ${error.keyValue.email} already exist, add someone new please`;
    }

    return error;
  }
};

module.exports = errorHandler;
