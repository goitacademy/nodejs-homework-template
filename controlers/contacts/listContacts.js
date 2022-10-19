const { Contact } = require("../../models/Contact");
const { RequestError } = require("../../helpers");

const listContacts = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
  if (!result) {
    throw RequestError(404, "Not found");
  }
};
module.exports = listContacts;
