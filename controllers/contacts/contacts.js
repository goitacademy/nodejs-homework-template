import { ctrlWrapper } from "../../decorators/index.js";
import * as contactControllers from "./index.js";

export default {
  getAll: ctrlWrapper(contactControllers.getAll),
  getById: ctrlWrapper(contactControllers.getById),
  add: ctrlWrapper(contactControllers.add),
  updateById: ctrlWrapper(contactControllers.updateById),
  deleteById: ctrlWrapper(contactControllers.deleteById),
  updateFavorite: ctrlWrapper(contactControllers.updateFavorite),
};
