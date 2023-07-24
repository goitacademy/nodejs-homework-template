// чтобы при ошибке поиска по ИД если не похоже на ид выдавал ошибку правильную
// const { isValidObjectId } = require('mongoose')

// const {HttpError} = require('../helpers/HttpError')

// const isValidId = (req, res, next) => {
//     const {id} = req.params
//     if(!isValidObjectId(id)){
//         return next(new HttpError(400, `${id} is not valid id`))
//     }
//     next()
// }

// module.exports = isValidId

// const { isValidObjectId } = require('mongoose');
// const { HttpError } = require('../helpers/HttpError');

// const isValidId = (req, res, next) => {
//     const { id } = req.params;
//     if (!isValidObjectId(id)) {
//         return next(new HttpError(400, `${id} is not a valid id`));
//     }
//     next();
// };

// module.exports = isValidId;

const { isValidObjectId } = require('mongoose');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    const error = new Error(`${id} is not a valid id`);
    error.status = 400;
    return next(error);
  }
  next();
};
module.exports = isValidId;