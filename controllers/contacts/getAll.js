const { createError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  if (!result) {
    throw createError(500);
  }
  res.status(200).json(result);
};

module.exports = getAll;

// function with try-catch
// const getAll = async (req, res, next) => {
//   try {
//     const result = await Contact.find();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error',
//     });
//   }
// };
