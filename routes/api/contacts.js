const express = require("express");

const router = express.Router();

const { NotFound, BadRequest } = require("http-errors");
const { isValidIdMiddleware } = require("../../helpers/isValidIdMiddleware");

const { JoiSchemas } = require("../../models/ contact");

// importing model instead of funcs ContactOperations (Contact Operations was for JSON file, not for db)
const { Contact } = require("../../models/ contact");

router.get("/", async (req, res, next) => {
  try {
    // using listContacts to get all the contacts
    const contacts = await Contact.find({}, "-updatedAt, -createdAt, -__v");

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

// isValidIdMiddleware checks if Id can possibly be an Id at all. It happens BEFORE any db query
router.get("/:contactId", isValidIdMiddleware, async (req, res, next) => {
  try {
    // contactId value is stored in req.params

    const { contactId } = req.params;

    // using findById
    const contact = await Contact.findById(contactId);

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
  }
});

router.post("/", async (req, res, next) => {
  try {
    // checking if there is an error while validating new contact body (req.body) if there is - throw an Error
    const { error } = JoiSchemas.contactObjectSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw new BadRequest("missing required name field");
    }
    const result = await Contact.create(req.body);
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

router.delete("/:contactId", isValidIdMiddleware, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
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

router.put("/:contactId", isValidIdMiddleware, async (req, res, next) => {
  try {
    const { error } = JoiSchemas.contactObjectUpdateSchema.validate(req.body);
    const { contactId } = req.params;
    if (error) {
      throw new BadRequest(
        "Hi, I'm BadRequest from PUT route. Message: validation is NOT successful"
      );
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

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

// route for updating "Favorite" field
router.patch(
  "/:contactId/favorite",
  // isValidIdMiddleware,
  async (req, res, next) => {
    try {
      const { error } = JoiSchemas.contactUpdateFavoriteSchema.validate(
        req.body
      );
      // reading contactId value
      const { contactId } = req.params;
      // if there is no OR wrong body (JoiValidation is NOT sucessful),  throw an Error
      if (error) {
        throw new BadRequest(
          "Hi, I'm BadRequest from PATCH route.message: missing field favorite"
        );
      }
      // otherwise
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
      });
      if (!result) {
        throw new NotFound("Oopsy, update hasn't come through");
      }
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
  }
);

module.exports = router;
