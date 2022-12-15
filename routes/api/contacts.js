const express = require('express')

const constacts = require("../../models/contacts")

const { HttpError} = require("../../helpers");

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await constacts.listContacts();

    res.json(result);
  }
  catch (error) {
    next(error);
  }

})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await constacts.getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found");
      // return res.status(404).json({
      //   message: "Not found",
      // })
    }

    res.json(result);
  }
  catch (error) {
    next(error);
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({
    //   message,
    // })
  }
})

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router
