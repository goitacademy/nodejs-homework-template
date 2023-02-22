const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id = ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = getContactById;
