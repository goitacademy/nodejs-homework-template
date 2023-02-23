const express = require("express");

const router = express.Router();

const { NotFound, BadRequest } = require("http-errors");
const authenticate = require("../../helpers/authenticate");
const { isValidIdMiddleware } = require("../../helpers/isValidIdMiddleware");

const { JoiSchemas } = require("../../models/ contact");

const { Contact } = require("../../models/ contact");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    console.log(_id);
    const contacts = await Contact.find(
      { owner: _id },
      "-updatedAt, -createdAt, -__v"
    );

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);

  }
});

router.get(
  "/:contactId",
  isValidIdMiddleware,
  authenticate,
  async (req, res, next) => {
    try {

      const { contactId } = req.params;

      const contact = await Contact.findById(contactId);

      if (!contact) {
        throw new NotFound("Oops, file not found");

      
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
  }
);

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = JoiSchemas.contactObjectSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw new BadRequest("missing required name field");
    }
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner: owner });
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

router.delete(
  "/:contactId",
  isValidIdMiddleware,
  authenticate,
  async (req, res, next) => {
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
  }
);

router.put(
  "/:contactId",
  isValidIdMiddleware,
  authenticate,
  async (req, res, next) => {
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
  }
);

router.patch(
  "/:contactId/favorite",
  isValidIdMiddleware,
  authenticate,
  async (req, res, next) => {
    try {
      const { error } = JoiSchemas.contactUpdateFavoriteSchema.validate(
        req.body
      );
      const { contactId } = req.params;
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
