const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const getById = async (req, res, next) => {
  const { id } = req.params;

  const result = await Contact.findById(id); // findOne({_id: id})
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getById;

// function with try-catch
// const getById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await Contact.findById(id); // findOne({_id: id})
//     if (!result) {
//       throw createError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
