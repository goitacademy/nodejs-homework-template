const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email subscription");

  let favoriteContact = null;
  if (favorite !== null) {
    favoriteContact = contacts.filter(
      (contact) => contact.favorite === JSON.parse(favorite)
    );
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: favoriteContact || contacts,
    },
  });
};

module.exports = listContacts;
