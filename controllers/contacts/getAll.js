const { Contact } = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");

  res.json({
    status: "success",
    code: 200,
    data: { allContacts },
  });
};
module.exports = getAll;
