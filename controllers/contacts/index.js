import { ctrlWrapperAsync } from "../../decorators/index.js";
import { add } from "./add.js";
import { getAll } from "./getAll.js";
import { getById } from "./getById.js";
import { removeById } from "./removeById.js";
import { updateById } from "./updateById.js";
import { updateStatusById } from "./updateStatusById.js";

export const ctrl = {
  add: ctrlWrapperAsync(add),
  getAll: ctrlWrapperAsync(getAll),
  getById: ctrlWrapperAsync(getById),
  removeById: ctrlWrapperAsync(removeById),
  updateById: ctrlWrapperAsync(updateById),
  updateStatusById: ctrlWrapperAsync(updateStatusById),
};
