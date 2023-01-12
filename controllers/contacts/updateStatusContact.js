const schemas = require("../../schemas/schemas");
const { Contact } = require("../../db/contactModel");
async function updateStatusContact(req, res, next) {
  try {
    const isValidData = schemas.patch.validate(req.body);
    if (isValidData.error) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const { contactId } = req.params;
    await Contact.updateOne({ _id: contactId }, req.body);
    const contact = await Contact.find({ _id: contactId });
    res.status(200).json({ contact });
  } catch (error) {
    return res.status(400).json({ status: "error" });
  }
}
module.exports = { updateStatusContact };
