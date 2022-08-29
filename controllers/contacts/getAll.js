const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email subscription");
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getAll;
