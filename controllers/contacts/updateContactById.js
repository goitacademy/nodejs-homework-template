const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

module.exports = updateContactById;
