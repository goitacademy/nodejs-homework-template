const { Contact } = require("../../models");
const { wrapper } = require("../../helpers");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit});

  res.json(result);
};

module.exports = wrapper(getContacts);
