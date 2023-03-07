const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};
module.exports = getAll;
