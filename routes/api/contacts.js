const express = require("express");

const router = express.Router();

const { NotFound, BadRequest } = require("http-errors");

const contactsOperations = require("../../models/contacts");

const Joi = require("joi");

// schema for validating contact info
const contactObjectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

// schema for updating contact info
const contactObjectUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    // using listContacts to get all the contacts
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
    //   status: "error",
    //   code: 500,
    //   message: "server error",
    // });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    // contactId value is stored in req.params
    // console.log(req.params);

    const { contactId } = req.params;
    // console.log(contactId);

    // using getContactById in order to get the contact
    const contact = await contactsOperations.getContactById(contactId);
    console.log(contact);

    // if there is no id in database it returns "null" which should be processed
    if (!contact) {
      // using http-error instead of manual throwing
      throw new NotFound("Oops, file not found");

      // generating an Error manually
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;

      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: "Not Found",
      // });
      // // MUST HAVE return otherwife the following res.json wil cause a server error
      // return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "server error",
    // });
  }
});

router.post("/", async (req, res, next) => {
  try {
    // checking if there is an error while validating new contact body (req.body) if there is - throw an Error
    const { error } = contactObjectSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw new BadRequest("missing required name field");
    }
    const result = await contactsOperations.addContact(req.body);
    console.log(result);
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

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound("Not found, can't delete");
    }
    res.status(200).json({
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactObjectUpdateSchema.validate(req.body);
    // console.log(error);
    if (error) {
      throw new BadRequest("valiation of at least 1 field is NOT succesful");
    }
    const { contactId } = req.params;

    const contactBodyUpdate = req.body;

    // console.log(contactId);
    // console.log(contactBodyUpdate);
    const result = await contactsOperations.updateContact(
      contactId,
      contactBodyUpdate
    );
    // console.log(result);

    res.status(200).json({
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

module.exports = router;
