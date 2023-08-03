import { ctrlWrapper } from "../../decorators/index.js";
import add from "./addContact.js";
import deleteById from "./deleteContactById.js";
import getAll from "./getAllContacts.js";
import getById from "./getContactById.js";
import updateById from "./updateContactById.js";
import updateStatusContact from "./updateStatusContact.js";

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};