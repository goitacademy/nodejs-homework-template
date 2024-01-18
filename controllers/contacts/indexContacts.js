import { Contacts } from "#models/contacts.shema.js";

async function indexContacts(req, res, next) {
  try {
    const contacts = await Contacts.find();
    return res.status(200).json(contacts);
  } catch (e) {
    console.log(e);
    res.status(500).json(`An error occurred: ${e}`);
  }
}

export { indexContacts };
