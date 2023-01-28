const express = require('express');
const router = express.Router();
const { 
  getAll, 
  getById, 
  add, 
  remove, 
  updateById, 
  updateStatus, 
} = require('../../controller/controllers');

router.get('/', getAll);
router.get('/:id', getById);
router.post("/", add);
router.delete("/:id", remove);
router.put("/:id", updateById);
router.patch("/:id/favorite", updateStatus);

module.exports = router;
