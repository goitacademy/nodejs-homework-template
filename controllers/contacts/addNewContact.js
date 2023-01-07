const schemas = require("../../schemas/schemas");
const { Contact } = require("../../db/contactModel");
async function addNewContact(req, res, next) {
  try {
    const isValidData = schemas.post.validate(req.body);
    if (isValidData.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const newContact = req.body;
    const { name, email, phone } = newContact;
    const contact = new Contact({ name, email, phone });
    await contact.save();
    // await db.addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    return res.status(400).json({ status: "error" });
  }
}
module.exports = { addNewContact };
