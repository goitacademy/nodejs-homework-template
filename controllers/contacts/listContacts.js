const {
  ContactModel: { Contact },
} = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner, favorite: true }, "", {
    skip,
    limit,
  });
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
};
