const { Contact, schemas } = require('../../models/contact');
const { createError } = require('../../helpers');

const updateStatusContact = async (req, res, next) => {
  const { error } = schemas.updateStatus.validate(req.body);
  if (error) {
    throw createError(400, 'missing field favorite');
  }

  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  // const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateStatusContact;

// function with try-catch
// const updateStatusContact = async (req, res, next) => {
//   try {
//     const { error } = schemas.updateStatus.validate(req.body);
//     if (error) {
//       throw createError(400, 'missing field favorite');
//     }
//     const { id } = req.params;
//     const result = await Contact.findByIdAndUpdate(id, req.body);
//     // const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

//     if (!result) {
//       throw createError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };
