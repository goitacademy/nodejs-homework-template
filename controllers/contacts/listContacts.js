const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contact = favorite ? { owner: _id, favorite } : { owner: _id };
  const contacts = await Contact.find(contact)
    .select("-createdAt -updatedAt")
    .skip(skip)
    .limit(parseInt(limit))
    .populate("owner", "_id email subscription");
  res.json(contacts);
};

module.exports = listContacts;
