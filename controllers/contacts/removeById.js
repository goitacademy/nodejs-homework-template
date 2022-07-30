const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404);
  }
  res.json({ message: 'contact deleted' });
};

module.exports = removeById;

// function with try-catch
// const removeById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await Contact.findByIdAndRemove(id);
//     if (!result) {
//       throw createError(404);
//     }
//     res.json({ message: 'contact deleted' });
//   } catch (error) {
//     next(error);
//   }
// };
