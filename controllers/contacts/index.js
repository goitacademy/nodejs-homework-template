import { ctrlWrapper } from "../../helpers/index.js";
import getAll from "./getAll.js";
import getById from "./getById.js";
import add from "./add.js";
import updateById from "./updateById.js";
import updateFavorite from "./updateFavorite.js";
import deleteById from "./deleteById.js";

const contactsController = {
  getById: ctrlWrapper(getById),
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};

export default contactsController;
