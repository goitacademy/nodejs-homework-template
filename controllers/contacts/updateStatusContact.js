const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new RequestError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

module.exports = updateStatusContact;
