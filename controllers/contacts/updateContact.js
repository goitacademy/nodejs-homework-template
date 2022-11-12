const { Contact } = require("../../models/contact");

const { requestError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;
