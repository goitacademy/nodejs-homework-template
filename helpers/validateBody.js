const HttpError = require('./httpError.js');

const validateBody = (schema) => {
    const func = async (req, res, next) => {
        try {
            await schema.validateAsync(req.body); // Используйте validateAsync для проверки
            next();
        } catch (error) {
            if (error.details && error.details[0]) {
                return next(HttpError(400, error.details[0].message));
            } else {
                // Если details или первый элемент отсутствуют, используйте общее сообщение об ошибке
                return next(HttpError(400, "Invalid request data"));
            }
        }
    };

    return func;
};

module.exports = validateBody;
