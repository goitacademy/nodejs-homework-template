// controllers/contact/index.js
import { getList } from "./getList.js";
import { getContactId } from "./getContactId.js";
import { postAddContact } from "./postAddContact.js";
import { deleteContact } from "./deleteContact.js";
import { updateContact } from "./updateContact.js";
import ctrWrapper from "../../decorators/ctrlWrapper.js";

export default {
  getList: ctrWrapper(getList),
  getContactId: ctrWrapper(getContactId),
  postAddContact: ctrWrapper(postAddContact),
  deleteContact: ctrWrapper(deleteContact),
  updateContact: ctrWrapper(updateContact),
};
