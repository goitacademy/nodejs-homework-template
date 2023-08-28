const handleMogooseError = (error, data, next) => {
    const { name, code } = error; 
    console.log(name);
    console.log(code);
    const status = (name==="MongoServerError"&& code=== 11000)? 409:400
    error.status = status;
    console.log("handleMogooseError", status);
    next();
 };

 module.exports = handleMogooseError