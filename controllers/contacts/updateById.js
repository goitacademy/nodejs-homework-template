const contactsOperations = require("../../models/contacts");
const schema = require("../../schema/schema");

const updateById = async (req, res) => {
  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    console.log(validateBody.error);
    return res.status(400).json({ message: "Є не заповнені поля" });
  }

  const updatedContact = await contactsOperations.updateContact(
    req.params.contactId,
    req.body
  );

  if (!updatedContact) {
    return res.status(404).json({ message: "Не знайдено" });
  }
  res.json(updatedContact);
};

module.exports = updateById;
