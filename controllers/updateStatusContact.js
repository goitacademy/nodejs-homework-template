const { Contact } = require("../models");
const { RequestError } = require("../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.params.id);
  const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateStatusContact;
