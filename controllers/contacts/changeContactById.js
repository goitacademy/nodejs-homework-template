const schemas = require("../../schemas/schemas");
const { Contact } = require("../../db/contactModel");
async function changeContactById(req, res, next) {
  try {
    const isValidData = schemas.put.validate(req.body);
    if (isValidData.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const { contactId } = req.params;
    await Contact.updateOne({ _id: contactId }, req.body);
    res.json(req.body);
  } catch (error) {
    return res.status(400).json({ status: "error" });
  }
}
module.exports = { changeContactById };
