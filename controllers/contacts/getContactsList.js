const { Contact } = require("../../models");

const getContactsList = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = false } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    { owner: _id, ...(favorite && { favorite }) },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email subscription");

  res.json({
    status: "Success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getContactsList;
