const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers/");

const getAll = async (req, res) => {
  const result = await Contact.find();
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getAll;
