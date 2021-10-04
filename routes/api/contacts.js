const express = require("express");

const { contactSchema } = require("../../schemas");

const contactsOperations = require("../../model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'Server error'
    // })
  }

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await contactsOperations.getContactById(id);

      if (!result) {
        const error = new Error(`Id ${id} not found`);
        error.status = 404;
        throw error;
      }

      res.json({
        status: "success",
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  });
});

router.post("/", async (req, res, next) => {
  try {
    // console.log(req.body);
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const { id } = req.params;
    const result = await contactsOperations.updateContactById(id, req.body);
    if (!result) {
      const error = new Error(`Id ${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      const error = new Error(`Id ${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Success delete'
    })

  } catch (error) {
    next(error);
  }
});

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.patch('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router;
