import { ctrlWrapper } from "../../helpers/index.js";

import listContacts from "./listContacts.js";
import getContactById from "./getContactById.js";
import addContact from "./addContact.js";
import removeContact from "./removeContact.js";
import updateContact from "./updateContact.js";
import updateFavorite from "./updateFavorite.js";

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
