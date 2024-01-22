import { removeContact } from "../../models/contacts.js";

const delateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  if (contact) {
    res.json({ status: 200, message: "contact deleted" });
  } else {
    res.json({ status: 404, message: "Not found" });
  }
};
export { delateContact };
