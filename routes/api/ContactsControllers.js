const asyncHandler = require("express-async-handler");
const {
  validationSchema,
  updateContactValidation,
  isFavoriteValid,
} = require("../../schemas/validation");
const contactsModel = require("../../models/contactsModel");

const { Error } = require("mongoose");
const { isRequestEmpty, isIdValid } = require("../../helpers");

class ContactListController {
  getOneContactById = asyncHandler(async (req, res, next) => {
    const { _id: owner } = req.user;
    const { contactId } = req.params;
    if (!isIdValid(contactId)) {
      res.status(400);
      throw new Error("Not valid ID");
    }
    try {
      const results = await contactsModel
        .find({ _id: contactId, owner })
        .exec();
      if (!results || !results.length) {
        res.status(404);
        throw new Error(`Contact with id: ${contactId} does not exist`);
      }
      res.json(results);
    } catch (error) {
      next(error);
    }
  });

  getAll = asyncHandler(async (req, res, next) => {
    const { _id: owner } = req.user;
    const result = await contactsModel.find({ owner });
    res.status(200).json({
      code: 200,
      message: "Success",
      data: result,
      qty: result.length,
    });
  });

  addContact = asyncHandler(async (req, res, next) => {
    const { _id: owner } = req.user;
    try {
      const { error } = validationSchema.validate(req.body);
      if (error) {
        res.status(400);
        throw new Error(error.message);
      }

      const results = await contactsModel.create({ ...req.body, owner });
      res.status(201).json(results);
    } catch (error) {
      next(error);
    }
  });

  deleteContactById = asyncHandler(async (req, res, next) => {
    const { contactId } = req.params;
    const { _id: owner } = req.user;

    if (!isIdValid(contactId)) {
      res.status(400);
      throw new Error("Not valid ID");
    }
    try {
      const contact = await contactsModel
        .find({ _id: contactId, owner })
        .exec();

      if (!contact) {
        res.status(404);
        throw new Error("ID not found");
      }
      await contactsModel.findByIdAndRemove(contactId);
      res
        .status(201)
        .json({ code: 201, message: "Deleted successfully", data: contact });

      //   res.status(200).json("Contact deleted");
    } catch (error) {
      next(error);
    }
  });

  updateContactById = asyncHandler(async (req, res, next) => {
    const { contactId } = req.params;
    const { body } = req;
    const { _id: owner } = req.user;
    if (isRequestEmpty(body)) {
      res.status(400);
      throw new Error("Missing fields");
    }

    const { error } = updateContactValidation.validate(body);

    if (error) {
      res.status(400);
      throw new Error(error.message);
    }
    try {
      const contact = await contactsModel
        .find({ _id: contactId, owner })
        .exec();

      if (!contact) {
        res.status(404);
        throw new Error("No such contact, nothing to update");
      }
      const results = await contactsModel.findByIdAndUpdate(contactId, body);
      res.json(results);
    } catch (error) {
      next(error);
    }
  });

  updateStatusContact = asyncHandler(async (req, res, next) => {
    const { contactId } = req.params;
    const { body } = req;
    const { error } = isFavoriteValid.validate(body);

    if (error) {
      res.status(400);
      throw new Error("Missing field 'Favorite'");
    }

    try {
      const results = await contactsModel.findByIdAndUpdate(contactId, body, {
        new: true,
      });
      if (results === null) {
        res.status(404);
        throw new Error("Contact not found");
      }
      res.json(results);
    } catch (error) {
      next(error);
    }
  });
}

module.exports = new ContactListController();
