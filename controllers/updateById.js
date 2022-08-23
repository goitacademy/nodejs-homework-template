const { Contact } = require("../models/contact");
const { RequestError } = require("../helpers");

const { schemas } = require("../models/contact");

const update = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  if (!req.body) {
    throw RequestError(400, "missing fields");
  }
  const { contactId } = req.params;
  console.log(contactId);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = update;
