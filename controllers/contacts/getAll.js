const { createError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { id: owner } = req.user;

  // req.query - містить параметри запиту (?)// req.params - дані маршруту
  // const { page = 1, limit = 2 } = req.query;
  // const skip = (page - 1) * limit;

  // const result = await Contact.find(
  //   { owner },
  //   { skip, limit: Number(limit) }
  // ).populate('owner', 'email');
  const result = await Contact.find({ owner }).populate('owner', 'email');
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
