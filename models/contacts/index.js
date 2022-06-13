import { listContacts } from "./listContacts.js";
import { addContact } from "./addContact.js";
import { getContactById } from "./getContactById.js";
import { removeContact } from "./removeContact.js";
import { updateContactById } from "./updateContactById.js";

const operations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
export default operations;
