const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { page = 1, limit = 10, ...filter } = req.query;

  const { _id: owner } = req.user;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, ...filter },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    },
  ).populate("owner", "name email");
  res.json(result);
};

module.exports = getAll;
