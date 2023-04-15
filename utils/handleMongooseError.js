
const { HttpError }= require("../helpers/httpError");

const handleMongooseError = (error, data, next)=> {
    if (error.name === 'ValidationError') {
        next(HttpError(400, `Помилка від Joi або іншої бібліотеки валідації`));
    } else {
        const {name, code} = error;
        error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    }
    next(error);

};

module.exports = handleMongooseError;