const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite, name, email } = req.query;
  const skip = (page - 1) * limit;

  const filters = { owner: _id };

  if (favorite) filters.favorite = favorite;

  if (name) filters.name = name;

  if (email) filters.email = email;

  if (filters.name || filters.favorite || filters.email) {
    const contacts = await Contact.find(filters, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");

    if (contacts.length === 0) {
      throw new NotFound("Contact not found");
    }
    res.json({
      data: {
        contacts,
      },
    });
  } else {
    const contacts = await Contact.find({ owner: _id }).populate(
      "owner",
      "_id name email"
    );
    res.json(contacts);
  }
};

module.exports = getAll;
