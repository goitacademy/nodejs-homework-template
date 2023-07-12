const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        next(HttpError(400, `${contactId} is not valid id`)); // формуємо самі помилку зі статусом 400 при невалідному id, т. як moongoose при такій ситуації статус не  ставить
    }
    next(); // якщо немає помилки
}

module.exports = isValidId;