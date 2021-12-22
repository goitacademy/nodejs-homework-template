import express from "express";
import contactsController from "../../controllers/contacts";

const router = express.Router();

router.get("/", async (_, res) =>
  contactsController.listContactsController(res)
);

router.get("/:id", async (req, res) =>
  contactsController.getContactByIdController(req, res)
);

router.post("/", async (req, res) =>
  contactsController.addContactController(req, res)
);

router.delete("/:id", async (req, res) =>
  contactsController.removeContactController(req, res)
);

router.put("/:id", async (req, res) =>
  contactsController.updateContactController(req, res)
);

router.patch("/:id/favorite/", async (req, res) =>
  contactsController.updateStatusContactController(req, res)
);

export default router;
