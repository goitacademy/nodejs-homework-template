// export { default } from "./contacts";
import getRouter from "./controllersContacts/get";
import getByIdRouter from "./controllersContacts/getById";
import postRouter from "./controllersContacts/post";
import deleteRouter from "./controllersContacts/delete";
import patchRouter from "./controllersContacts/patch";

export { getRouter, postRouter, deleteRouter, patchRouter, getByIdRouter };
