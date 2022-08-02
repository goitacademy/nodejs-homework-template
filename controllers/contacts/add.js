const { Contact, schemas } = require('../../models/contact');
const { createError } = require('../../helpers');

const add = async (req, res, next) => {
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, 'missing required name field');
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = add;

// function with try-catch
// const add = async (req, res, next) => {
//   try {
//     const { error } = schemas.add.validate(req.body);
//     if (error) {
//       throw createError(400, 'missing required name field');
//     }
//     const result = await Contact.create(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
