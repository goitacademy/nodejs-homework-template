// const contactOperations = require("../../models/contacts");
const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;
  const contact = await Contact.find({ owner: _id }, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  res.json({
    status: "success",
    code: 200,
    data: { contact },
  });
};

module.exports = getAll;
