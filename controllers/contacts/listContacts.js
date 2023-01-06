const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription");

  res.json({
    status: "Success",
    code: 200,
    message: "Contacts received",
    data: { contacts },
  });
};

module.exports = listContacts;
