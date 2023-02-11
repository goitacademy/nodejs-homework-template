const Joi = require("joi");
const contactModel = require("./contacts.model");
const { ObjectId } = require("mongodb");

class ContactControllers {
  async getAllContacts(req, res, next) {
    try {
      const contacts = await contactModel.find();
      return res.status(200).json(contacts).send();
    } catch (error) {
      next(error);
    }
  }

  async getContact(req, res, next) {
    try {
      const contact = await contactModel.findById(req.params.contactId);

      if (!contact) {
        return res.status(404).json({
          error: "contact not found",
        });
      }
      return res.status(200).json(contact).send();
    } catch (error) {
      next(error);
    }
  }

  validateUserID(req, res, next) {
    const contactId = req.params.contactId;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        error: "Invalid user id",
      });
    }

    next();
  }

  async removeContactById(req, res, next) {
    try {
      const contact = await contactModel.findByIdAndRemove(
        req.params.contactId
      );

      if (!contact) {
        return res.status(404).json({
          error: "Contact not found",
        });
      }

      return res.status(200).json({
        message: "Contact deleted",
        user: contact,
      });
    } catch (error) {
      next(error);
    }
  }

  async addNewContact(req, res, next) {
    try {
      const requestBody = req.body;
      const newBody = { ...requestBody, favorite: false };
      const contact = await contactModel.create(newBody); // - function for creation an element in Mongodb with validation

      return res
        .status(201)
        .json({ contact: contact, message: "Contact added" });
    } catch (error) {
      next(error);
    }
  }

  validateAddContact(req, res, next) {
    const validationSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.bool().required(),
    });

    const contactData = req.body;
    const result = validationSchema.validate(contactData);

    if (result?.error) {
      return res
        .status(400)
        .json({
          message: result.error.details[0].message,
        })
        .send();
    }

    next();
  }

  async updateContactById(req, res, next) {
    try {
      const contactId = req.params.contactId;
      const requestBody = req.body;

      const updateResults = await contactModel.findByIdAndUpdate(
        contactId,
        requestBody
      );

      if (!updateResults) {
        return res.status(404).json({
          error: "Contact is not found",
        });
      }

      return res.status(204).json({ message: "Contact updated" });
    } catch (error) {
      next({
        error: error,
        message: "Contact is not found",
      });
    }
  }

  validateUpdateContactById(req, res, next) {
    const validationSchema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      favorite: Joi.bool(),
    });

    const contactData = req.body;
    const result = validationSchema.validate(contactData);

    if (result?.error) {
      return res.status(400).json({ message: "missing fields" }).send();
    }

    next();
  }

  async updateStatusContact(req, res, next) {
    try {
      const contactId = req.params.contactId;
      const requestBody = req.body;

      if (!requestBody.favorite) {
        return res.status(400).json({ message: "missing field favorite" });
      }

      const updateResults = await contactModel.findByIdAndUpdate(
        contactId,
        requestBody,
        { new: true }
      );

      return res.status(200).json(updateResults);
    } catch (error) {
      next({ message: "Not found" });
    }
  }
}

const contactControllers = new ContactControllers();

module.exports = contactControllers;
