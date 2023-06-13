const { Contact } = require("../../models/contacts");
const { ctrlWrapper } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = true } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
      favorite,
    }
  ).populate("owner", "email");
  res.json(result);
};

module.exports = ctrlWrapper(getAllContacts);
