const {HttpError} = require("../helpers");

const validateBody = schema => {
    const func = (req, res, next) => {
        console.log("req.body", req.body)
        const { error } = schema.validate(req.body);
        console.log("error", error)
        if(error) {
            next(HttpError(400, `Ошибка от Joi или другой библиотеки валидации`));
        }
        next()
    }

    return func;
}

module.exports = validateBody;