const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact with id ${contactId} was deleted`,
    data: {
      result,
    },
  });
};
module.exports = removeContact;
