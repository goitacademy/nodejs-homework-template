const contactsOperations = require("../../models/contacts");
const schema = require("../../schema/schema");

const add = async (req, res) => {
  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    console.log(validateBody.error);
    return res
      .status(400)
      .json({ message: "Не заповнено обов'язкове поле імені" });
  }
  const newContact = await contactsOperations.addContact(req.body);
  res.json(newContact);
};

module.exports = add;
