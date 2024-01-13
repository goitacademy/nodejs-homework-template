const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

/* Здесь isValidObjectId проверяет, является ли contactId допустимым ObjectId. Если не является, то вызывается middleware next с ошибкой 404.
isValidObjectId - это метод из библиотеки mongoose, который используется для проверки, является ли переданное значение строкой допустимым ObjectId в формате MongoDB.

ObjectId - это уникальный идентификатор, который MongoDB автоматически присваивает каждому документу при его создании в коллекции. ObjectId состоит из 12 байт, включая информацию о времени создания, машине, идентификаторе процесса и случайном значении. ObjectId обеспечивает уникальность идентификатора документа в пределах коллекции. */

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    throw next(HttpError(404, `Not Found`));
  }
  next();
};

module.exports = isValidId;
