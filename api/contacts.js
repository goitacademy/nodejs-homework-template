const express = require("express");
const router = express.Router();

const {
	get,
	getById,
	create,
	update,
	updateStatus,
	remove,
} = require("../controller/contacts");

router.get("/", get);

router.get("/:id", getById);

router.post("", create);

router.put("/:id", update);

router.patch("/:id/status", updateStatus);

router.delete("/:id", remove);

module.exports = router;
