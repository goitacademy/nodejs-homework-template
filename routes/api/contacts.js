const express = require("express");

const router = express.Router();

const cntrl = require("../../controllers/contacts");

router.get("/", cntrl.getAll);

router.get("/:id", cntrl.getById);

router.post("/", cntrl.add);

router.delete("/:id", cntrl.remove);

router.put("/:id", cntrl.update);

module.exports = router;
//npm run start:dev
