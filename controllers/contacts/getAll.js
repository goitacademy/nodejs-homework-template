const { Contact } = require("../../models/contacts");

const getContacts = async (req, res, next) => {
  const { _id } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;

  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner: _id },
    "name email phone favorite",
    { skip, limit: Number(limit) }
  ).populate("owner", "_id email subscription");
  if (favorite) {
    const result = await Contact.find(
      { owner: _id, favorite: favorite },
      "name email phone favorite",
      { skip, limit: Number(limit) }
    ).populate("owner", "_id email subscription");
    return res.status(200).json({ data: { contacts: result } });
  }
  res.status(200).json({ data: { contacts: result } });
};

module.exports = getContacts;
