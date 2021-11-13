import {
  getContacts,
  getContactById,
  postContact,
  updateContact,
  updateStatusContact,
  deleteContact,
} from "./contactsController";

import { signup, login, logout, current } from "./usersController";

export {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  updateContact,
  updateStatusContact,
  signup,
  login,
  logout,
  current,
};
