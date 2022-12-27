const Contact = require("../../models/contact");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const match = {};
  if (favorite) {
    match.favorite = favorite === "true";
  }

  const contacts = await Contact.find(
    { owner: _id },
    "-createdAt, -updatedAt",
    { skip, limit: Number(limit) }
  ).populate("owner", "_id email", match);

  res.json({
    status: "success",
    code: 200,
    message: "Contacts found",
    data: {
      contacts,
    },
  });
};

module.exports = getContacts;
