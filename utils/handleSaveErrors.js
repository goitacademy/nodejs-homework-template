const handleSaveErrors = (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongooseServerErorr" && code === 11000 ? 409 : 400;
  console.log(name);
  console.log(code);
  next();
};

module.exports = handleSaveErrors;
