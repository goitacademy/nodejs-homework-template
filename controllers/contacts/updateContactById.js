const contactsOperations = require("../../models/contacts");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.updateContactById(
    contactId,
    req.body
  );
  if (!result) {
    res.status(404).json(`Not found`);
  }
  res.status(200).json({ result });
};

module.exports = updateContactById;
