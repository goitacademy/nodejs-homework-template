const { Contact } = require("../../models/contact");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    const error = new Error(`There is no contacts with ID ${contactId}`);
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
    data: { result },
  });
};

module.exports = removeById;
