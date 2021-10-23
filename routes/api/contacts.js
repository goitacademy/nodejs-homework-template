const express = require("express");
const createError = require("http-errors");
const { Contact } = require("../../models");
const { joiSchema } = require("../../models");
const { validation, authenticate } = require("../../middlewares");
const router = express.Router();
// const { Order } = require("../../models");

router.get("/", authenticate, validation(joiSchema), async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await Contact.find(
      { owner: _id },
      "id name email phone"
    ).populate("owner", "email");
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const { _id } = req.user;
      let contact;
      // eslint-disable-next-line no-constant-condition
      if ({ owner: _id }) {
        contact = await Contact.findByIdAndDelete(contactId);
      } else if (!contact) {
        // eslint-disable-next-line new-cap
        throw new createError(404, `Contact with id - ${contactId} not found`);
      }
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  async (req, res, next) => {
    try {
      const { error } = joiSchema.validate(req.body);
      if (error) {
        // eslint-disable-next-line new-cap
        throw new createError(400, `bad request`);
      }

      const newContact = { ...req.body, owner: req.user._id };

      const result = await Contact.create(newContact);
      res.status(201).json({
        status: "success added",
        code: 201,
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const { _id } = req.user;
      console.log(_id);
      let result;
      // eslint-disable-next-line no-constant-condition
      if ({ owner: _id }) {
        result = await Contact.findByIdAndDelete(contactId);
      } else if (!result) {
        // eslint-disable-next-line new-cap
        throw new createError(404, `Contact with id - ${contactId} not found`);
      }
      res.json({
        status: "success delete",
        code: 200,
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { contactId } = req.params;
      const { error } = joiSchema.validate(req.body);
      let result;
      if (error) {
        // eslint-disable-next-line new-cap
        throw new createError(400, `bad request`);
        // eslint-disable-next-line no-constant-condition
      } else if ({ owner: _id }) {
        result = await Contact.findByIdAndUpdate(contactId, req.body, {
          new: true,
        });
      }

      if (!result) {
        // eslint-disable-next-line new-cap
        throw new createError(404, `Contact with id - ${contactId} not found`);
      }
      res.json({
        status: "success update",
        code: 200,
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
