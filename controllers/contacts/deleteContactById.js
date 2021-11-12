const { Contact } = require("../../model");
const { NotFound } = require("http-errors");

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndRemove(contactId);
  if (!data) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
 
};

module.exports = deleteContactById;
