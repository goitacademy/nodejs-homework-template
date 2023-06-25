const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  if (!contacts) {
    return null;
  }
  res.status(200).json({
    message: "the request for all contacts was made successfully",
    result: { contacts },
  });
};

module.exports = getAll;
