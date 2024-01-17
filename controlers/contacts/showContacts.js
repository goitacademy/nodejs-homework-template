import { getContactById } from "../../models/contacts.js";

async function showContacts(req, res, next) {
  const { contactId } = req.params;
  try {
    const getById = await getContactById(contactId);
    if (getById) {
      return res.json(getById);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(`An error occurred: ${e}`);
  }
}

export { showContacts };
