const express = require("express");
 

const { basedir } = global;

 

const ctrl = require(`${basedir}/controllers/contacts`);

const { auth } = require(`${basedir}/middlewares`);


 

const { ctrlWrapper } = require(`${basedir}/helpers`);



const router = express.Router();

 

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, ctrlWrapper(ctrl.add));

router.put("/:id", auth, ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", auth, ctrlWrapper(ctrl.updateFavorite));



router.delete("/:id", auth, ctrlWrapper(ctrl.removeById));

module.exports = router;