const express = require("express");
const avatarsRouter = express.Router();

const {
  downloadController,
  uploadController,
} = require("../../controllers/avatars.controller");
const { tryCatchWrapper } = require("../../helpers/wrappers");

const { auth } = require("../../middlewares/authMiddleware");

// contactsRouter.get(
//   "/",
//   tryCatchWrapper(auth),
//   tryCatchWrapper(getAllController)
// );

avatarsRouter.get(
  "/:filename",
  tryCatchWrapper(auth),
  tryCatchWrapper(downloadController)
);

avatarsRouter.post(
  "/",
  tryCatchWrapper(auth),
  tryCatchWrapper(uploadController)
);

// contactsRouter.post(
//   "/",
//   tryCatchWrapper(auth),
//   tryCatchWrapper(createContactController)
// );

// contactsRouter.delete(
//   "/:contactId",
//   tryCatchWrapper(auth),
//   tryCatchWrapper(removeContactController)
// );

// contactsRouter.put(
//   "/:contactId",
//   tryCatchWrapper(auth),
//   tryCatchWrapper(updateContactController)
// );

// contactsRouter.patch(
//   "/:contactId/favorite",
//   tryCatchWrapper(auth),
//   tryCatchWrapper(updateStatusContactController)
// );

module.exports = avatarsRouter;
