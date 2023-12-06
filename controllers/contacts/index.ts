import { ctrlWrapper } from "../../helpers";

import listContacts from "./listContacts";
import getContactById from "./getContactById";
import addContact from "./addContact";
import removeContact from "./removeContact";
import updateContact from "./updateContact";
import updateFavorite from "./updateFavorite";

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
