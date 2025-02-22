const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, {}, { skip, page }).populate(
    "owner",
    "email"
  );

  res.json(result);
};

module.exports = getAllContacts;
