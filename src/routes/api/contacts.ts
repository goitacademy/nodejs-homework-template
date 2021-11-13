import express from "express";
import {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  updateContact,
  updateStatusContact,
} from "../../controller";
import {
  addContactValidation,
  updateContactValidation,
  checkFieldInContact,
  checkIdInContact,
  updateStatusContactValidation,
  authenticateUser,
} from "../../middlewares";
import { asyncWrapper } from "../../helpers";

const router = express.Router();

router.get("/", asyncWrapper([authenticateUser]), asyncWrapper([getContacts]));

router.get(
  "/:contactId",
  asyncWrapper([authenticateUser, checkIdInContact]),
  asyncWrapper([getContactById])
);

router.delete(
  "/:contactId",
  asyncWrapper([authenticateUser, checkIdInContact]),
  asyncWrapper([deleteContact])
);

router.post(
  "/",
  asyncWrapper([authenticateUser, addContactValidation, checkFieldInContact]),
  asyncWrapper([postContact])
);

router.put(
  "/:contactId",
  asyncWrapper([
    authenticateUser,
    updateContactValidation,
    checkIdInContact,
    checkFieldInContact,
  ]),
  asyncWrapper([updateContact])
);

router.patch(
  "/:contactId/favorite",
  asyncWrapper([
    authenticateUser,
    checkIdInContact,
    updateStatusContactValidation,
  ]),
  asyncWrapper([updateStatusContact])
);

export { router };
