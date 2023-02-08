const Contact = require("../models/ContactsModel");
const { isValidObjectId } = require("mongoose");

const {
  getAllContacts,
  getOneContact,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

class ContactsController {
  async addNewContact(req, res, next) {
    const newContact = await Contact.create(req.body);
    res.status(201).json({ data: { contact: newContact } });

    if (!newContact) {
      res.status(404).json({ message: "unable to save" });
    }
  }

  async getAll(req, res, next) {
    try {
      const contact = await Contact.find();
      res.json({ data: contact, quantity: contact.length });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const isValid = isValidObjectId(id);
      if (!isValid) {
        return res
          .status(404)
          .json({ message: `Contact with id:${id} not found` });
      }
      const result = await Contact.findById(id);
      if (!result) {
        return res
          .status(404)
          .json({ message: `Contact with id:${id} not found` });
      }

      res.status(200).json({
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;

    const isValid = isValidObjectId(id);
    if (!isValid) {
      return res
        .status(404)
        .json({ message: `Contact with id:${id} not found` });
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: `Contact with id:${id} not found` });
    }

    return res.json({ data: { contact: updatedContact } });
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;

      const isValid = isValidObjectId(id);
      if (!isValid) {
        return res
          .status(404)
          .json({ message: `Contact with id:${id} not found` });
      }

      const contact = await Contact.findByIdAndDelete(id);

      if (!contact) {
        return res
          .status(404)
          .json({ message: `Contact with id:${id} not found` });
      }

      res.status(200).json({ data: { contact }, message: "Contact deleted" });
    } catch (error) {
      next(error);
    }
  }

  async updateStatusContact(req, res, next) {
    const { id } = req.params;
    console.log(id);

    const { favorite } = req.body;
    console.log(favorite);
    console.log(req.body);
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
      }
    );

    if (!updatedContact) {
      return res
        .status(404)
        .json({ message: `Contact with id:${id} not found` });
    } else {
      res.status(200).json(updatedContact);
    }
  }
}

module.exports = new ContactsController();
