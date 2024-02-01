import { indexContacts } from "#controllers/contacts/indexContacts.js";
import { showContacts } from "#controllers/contacts/showContacts.js";
import { deleteContacts } from "#controllers/contacts/deleteContacts.js";
import { updateContacts } from "#controllers/contacts/updateContacts.js";
import { createContacts } from "#controllers/contacts/createContacts.js";
import { updateStatusContactController } from "#controllers/contacts/updateStatusContact.js";

export {
  deleteContacts,
  createContacts,
  updateContacts,
  showContacts,
  indexContacts,
  updateStatusContactController,
};
