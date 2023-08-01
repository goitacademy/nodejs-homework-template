const { HttpError } = require('../helpers/');

// функция проверки стандартного тела запроса
const validateBody = schema => {
 const func = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
   next(HttpError(400, error.message));
  }
  next();
 };
 return func;
};

// отдельная функция проверки тела запроса на наличие поля favorite
// хз зачем отдельная, но так написано в условиях ДЗ
// можно поставить поле обязательным и по дефолту сделать false
const validateFavoriteBody = schema => {
 const func = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
   next(HttpError(400, 'missing field favorite'));
  }
  next();
 };
 return func;
};

module.exports = { validateBody, validateFavoriteBody };
