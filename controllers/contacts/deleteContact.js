// const { removeContact } = require("../../models/contacts");
const deleteContact = async (req, res, next) => {
  // try {
  const { contactId } = req.params;
  //   const contactList = await removeContact(contactId);
  //   if (contactList === null) {
  //     throw new Error(`Not found`);
  //   }
  //   res.status(200);
  //   res.json({ message: "contact deleted" });
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};
module.exports = deleteContact;
