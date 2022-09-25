const { getContactById } = require("../../models/contacts");
const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const searchContact = await getContactById(contactId);
    if (!searchContact) {
      throw new Error(`Not found`);
    }
    res.status(200);
    res.json({ contact: searchContact });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = getContact;
