const Contact = require('../../models/MongooseModels/contact');

const { HttpError, ctrlWrapper } = require('../../helpers');

const getAllContacts = async (req, res) => {
  const data = await Contact.find({}, '-createdAt -updatedAt');
  res.json(data);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
};
