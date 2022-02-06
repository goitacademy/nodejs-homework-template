const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  const { _id } = req.user;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
    skip,
    limit: +limit,
  }).populate("owner", "email");
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = listContacts;
