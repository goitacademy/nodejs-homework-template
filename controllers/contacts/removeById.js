const { NotFound } = require("http-errors");

const {Contact} = require("../../model");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({ message: `Contact with id=${contactId} deleted` });
};

module.exports = removeById;
