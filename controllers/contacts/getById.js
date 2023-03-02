const contactOperations = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactOperations.getContactById(contactId);
  if (!contact) {
    const error = new Error(`contact whith id = ${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = getById;
