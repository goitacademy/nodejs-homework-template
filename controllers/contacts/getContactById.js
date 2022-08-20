const { Contact } = require("../../models/contact");
const { requestError } = require("../../helpers/");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw requestError(404, `Id ${id} not found, try a different id`);
  }
  res.json(result);
};

module.exports = getContactById;
