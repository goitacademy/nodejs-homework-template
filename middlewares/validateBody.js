const { HttpError } = require('../helpers');
// отримує schema і повертає валідацію
const validateBody = schema => {
    const func = (req, _, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
        // виклик next перериває як ретьорн
        next(HttpError(400, error.message));
        }
        // якщо ні то ідемо далі
        next();
    };

    return func;
};

module.exports = { validateBody };
