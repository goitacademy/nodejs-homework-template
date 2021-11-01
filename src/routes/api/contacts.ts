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
} from "../../middlewares";
import { asyncWrapper } from "../../helpers";

const router = express.Router();

router.get("/", [getContacts]);

router.get(
  "/:contactId",
  asyncWrapper([checkIdInContact]),
  asyncWrapper([getContactById])
);

router.delete(
  "/:contactId",
  asyncWrapper([checkIdInContact]),
  asyncWrapper([deleteContact])
);

router.post(
  "/",
  asyncWrapper([addContactValidation, checkFieldInContact]),
  asyncWrapper([postContact])
);

router.patch(
  "/:contactId",
  asyncWrapper([
    updateContactValidation,
    checkIdInContact,
    checkFieldInContact,
  ]),
  asyncWrapper([updateContact])
);

router.patch(
  "/:contactId/favorite",
  asyncWrapper([checkIdInContact, updateStatusContactValidation]),
  asyncWrapper([updateStatusContact])
);

export = router;
