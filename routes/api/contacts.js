const express = require("express");

const router = express.Router();
const jwtMiddelware = require("./middlewares/jwtToken.middleware");

const { contacts: ctrl } = require("./controller");

router.get("/", jwtMiddelware, ctrl.getAll);

router.get("/:contactId", jwtMiddelware, ctrl.getById);

router.post("/", jwtMiddelware, ctrl.add);

router.put("/:contactId", jwtMiddelware, ctrl.update);

router.delete("/:contactId", jwtMiddelware, ctrl.del);

router.put("/favorite/:contactId", jwtMiddelware, ctrl.updateFav);

module.exports = router;
