const { Contact } = require("../../models");

const getContactsListController = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const filterValue = favorite ? { owner: _id, favorite } : { owner: _id };
  const skip = (page - 1) * limit;

  const contactsList = await Contact.find(filterValue, "", {
    skip,
    limit: +limit,
  });

  res.status(200).json(contactsList);
};

module.exports = getContactsListController;
