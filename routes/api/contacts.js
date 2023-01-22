const express = require('express');
const router = express.Router();
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'ukr'] } }),
  phone: Joi.number().positive().min(5).required(),
});

const contactsOperation = require('../../models/contacts');
const { 
    listContacts, 
    getContactById, 
    addContact, 
    removeContact, 
    updateContact 
} = contactsOperation;

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({
        status: "success",
        code: 200,
        result: {
            data: contacts,
        }
    });
  } catch (error) {
    next(error);
  }
    
})


router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await getContactById(id);

    if (!contactById) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
        status: "success",
        code: 200,
        result: {
            data: contactById,
        }
    });
  } catch (error) {
    next(error)
  }
})


router.post("/", async (req, res, next) => {
  try {
    const validationResult = contactSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: validationResult.error.details,
      });
    }

    const newContact = await addContact(req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      result: {
        data: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactDeleted = await removeContact(id);

    if (!contactDeleted) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});


router.put("/:id", async (req, res, next) => {
  try {
    const validationResult = contactSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: validationResult.error.details,
      });
    }

    const { id } = req.params;
    const contactUpdated = await updateContact(id, req.body);

    if (!contactUpdated) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      result: {
        data: contactUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
