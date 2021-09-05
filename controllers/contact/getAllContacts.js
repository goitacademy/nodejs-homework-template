const { Contacts } = require("../../repositories");
const { Contact } = require("../../model");

const getAllContacts = async (req, res, _next) => {
  const result = await Contact.find({ owner: req.user._id }).populate(
    "owner",
    "_id email"
  );
  return res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getAllContacts;
