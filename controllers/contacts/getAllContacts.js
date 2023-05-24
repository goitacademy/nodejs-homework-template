const { Contact } = require("../../models/book");

// const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../../decorators");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const updateStatusContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, `${contactId} not found`);
//   }
//   res.json({ result });
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  //   updateStatusContact: ctrlWrapper(updateStatusContact),
};
