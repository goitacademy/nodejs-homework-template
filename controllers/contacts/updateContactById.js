const { basedir } = global;
const { Contact, schemas } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const updateContactById = async (req, res) => {
  // Preventing lack of necessary data
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, "missing fields");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });

  if (!result) {
    throw createError(404);
  }

  res.json(result);
}

module.exports = updateContactById;