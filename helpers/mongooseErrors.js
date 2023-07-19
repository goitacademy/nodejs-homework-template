const mongooseError = (error, data, next) => {
    const {name, code} = error;
    const status = name === "MongoServerError" && code === 11000;
    error.status = status  ? 409 : 400;
    next();
  }

module.exports = mongooseError