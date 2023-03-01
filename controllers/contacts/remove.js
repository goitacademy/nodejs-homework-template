const contactOperations = require("../../models/contacts");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await contactOperations.removeContact(contactId);
  if (!contactToDelete) {
    const error = new Error(`contact whith id = ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactToDelete,
    },
  });
};

module.exports = remove;
