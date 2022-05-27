const operations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactItem = await operations.getContactById(contactId);
  if (!contactItem) {
    throw new NotFound(`Contacts with id ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: contactItem,
  });
};
module.exports = getContactById;
