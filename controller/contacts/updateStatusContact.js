const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers/RequestError");

const updateStatusContact = async (req, res) => {
  const { id } = rq.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateStatusContact;
