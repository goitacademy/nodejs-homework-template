const handleSchemaValidationErrors = (error, data, next) => {
    const { name, code } = error;
    // console.log("Error handler"); //!
    // console.log("name:", name); //!
    // console.log("code:", code); //!
    if (name === "MongoServerError" && code === 11000) {
        error.status = 409;
    } else {
        error.status = 400;
    };
    next();
};

module.exports = handleSchemaValidationErrors;