const contactOperations = require("../../models/contacts");

const update = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;
  const contactToUpdate = await contactOperations.updateContact(
    contactId,
    body
  );
  if (!contactToUpdate) {
    const error = new Error(`contact whith id = ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactToUpdate,
    },
  });
};

module.exports = update;
