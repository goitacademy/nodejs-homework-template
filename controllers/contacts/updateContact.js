const { basedir } = global;

const { Contact, schemas } = require(`${basedir}/models/contact`);
const { createError } = require(`${basedir}/helpers`);

const updateContact = async (req, res) => {
  const { error } = schemas.contactAdd.validate(req.body);
  if (error) {
    throw createError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw createError(404);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
