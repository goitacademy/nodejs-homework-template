const express = require('express')
const Joi = require("joi");

const contactSchema = Joi.object({
	name: Joi.string().min(1).required(),
	email: Joi.string().email(),
	phone: Joi.string().min(1).required()
})

const router = express.Router()

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      },
    });
  } catch (error) {
    next(error);
  }
});

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      const error = new Error(`Contact with id "${id}" not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      },
    });
  } catch (error) {
    next(error);
  }
});

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }
    const result = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      },
    });
  } catch (error) {
    next(error);
  }
});

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      const error = new Error(`Contact with id "${id}" not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result
      },
    });
  } catch (error) {}
});

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })
router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing fields";
      throw error;
    }
    const { id } = req.params;
    const result = await updateContact(id, req.body);
    if (!result) {
      const error = new Error(`Contact with id "${id}" not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 201,
      data: {
        result
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router
