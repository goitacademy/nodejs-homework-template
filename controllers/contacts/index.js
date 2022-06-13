import { getAll } from "./getAll.js";
import { add } from "./add.js";
import { getById } from "./getById.js";
import { updateById } from "./updateById.js";
import { removeById } from "./removeById.js";

const contacts = {
  getAll,
  add,
  getById,
  updateById,
  removeById,
};

export default contacts;
