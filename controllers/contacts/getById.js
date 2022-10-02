const { Contact } = require("../../models/contact");
const { RequsetError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  console.log(result);
  if (!result) {
    throw RequsetError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
