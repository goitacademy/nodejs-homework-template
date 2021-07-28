const express = require("express");

const router = express.Router();
const jwtMiddelware = require("./middlewares/jwtToken.middleware");

const { contacts: ctrl } = require("./controller");

router.get("/", jwtMiddelware, ctrl.getAll);

router.get("/:contactId", jwtMiddelware, ctrl.getById);

router.post("/", ctrl.add);

router.put("/:contactId", ctrl.update);

router.delete("/:contactId", ctrl.del);

router.put("/favorite/:contactId", ctrl.updateFav);

module.exports = router;
