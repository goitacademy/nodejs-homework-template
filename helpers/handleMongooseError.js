const handleMongooseError = (error, _, next) => {
  console.log("error", error.name);
  const { name, code } = error;

  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
    // error.message = "Email in use";
  } else {
    error.status = 400;
  }
  next();
};

module.exports = handleMongooseError;
