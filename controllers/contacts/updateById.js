const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const updateContactById = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!updateContactById) {
    throw new NotFound(`Contact not found`);
  }
  res.status(200).json({
    message: "contact successfully updated",
    result: updateContactById,
  });
};

module.exports = removeById;
