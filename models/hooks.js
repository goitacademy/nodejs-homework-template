const handleSaveError = (error, data, next) => {
    const { name, code } = error;
  error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
  // if (name === "MongoServerError" && code === 11000) { 
  //   error.message = "Email in use"
  // }
    next();
}
      
const runValidatorsAtApdate = function (next) {
  this.options.runValidators = true;
  next();
}
  
  

module.exports = { handleSaveError, runValidatorsAtApdate}