// const express = require('express')
// // const {NotFound} = require("http-errors");
// const router = express.Router();

// const ctrl = require('../../controllers/contacts')





// router.get("/", ctrl.getAll);

// router.get('/:contactId', ctrl.getById)

// router.post("/", ctrl.add);

// router.delete("/:id", ctrl.deleteById )


// router.put("/:id",ctrl.updateById);

// module.exports = router

const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.add);

router.put("/:id", ctrl.updateById);

router.patch("/:id/favorite", ctrl.updateFavorite);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;