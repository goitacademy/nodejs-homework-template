const express = require("express");

const router = express.Router();

const ctrl = require('../../controllers/contacts')

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);
 
router.post("/", ctrl.add);

router.delete("/:id", ctrl.removeById); 

router.put("/:id", ctrl.updateById);

router.patch("/:id/favorite", ctrl.updateFavorite);


module.exports = router;
