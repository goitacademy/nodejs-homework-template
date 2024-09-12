const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt",
    {
      skip,
      limit: +limit,
    }
  ).populate("owner", "email");
  res.json({ status: "succsess", code: 200, data: contacts });
};

module.exports = getAllContacts;