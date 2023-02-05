const { Contact } = require("../../models");

const getContactsListController = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const contactsList = await Contact.find({ owner: _id }, "", {
    skip,
    limit: +limit,
  });

  res.status(200).json(contactsList);
};

module.exports = getContactsListController;
