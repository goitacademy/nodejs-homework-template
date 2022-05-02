const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contsct = await Contact.findByIdAndRemove(contactId);
  if (!contsct) {
    const error = new Error(`Not found ${contactId}`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    message: "product deleted",
    data: { result: contsct },
  });
};

module.exports = removeContact;
