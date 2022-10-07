const { RequestError } = require('../helpers');

// Вызываю метод validate и передаю что нужно проверить
// validate() возвращает объект с полем error
// которое я деструктуризирую
//

const validateBody = scheme => {
    const func = (req, res, next) => {
        const { error } = scheme.validate(req.body);

        if (error) {
            next(RequestError(400, error.message));
        }
        next();
    };
    return func;
};

module.exports = validateBody;
