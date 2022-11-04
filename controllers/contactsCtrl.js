const contactsService = require("../services/contacts");

const get = async (req, res, next) => {
  try {
    const contacts = await contactsService.getAllContacts();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.getSingleContact(contactId);
    if (contact) {
      return res.status(200).json(contact);
    }

    res.status(404).json({
      message: "Contact not found",
    });
  } catch (err) {
    next(err);
  }
};

const post = async (req, res, next) => {
  try {
    const contact = await contactsService.createContact(req.body);
    res.status(201).json({
      message: "Contact was created",
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.deleteContact(contactId);

    if (contact) {
      return res.status(200).json({
        message: "Contact deleted",
      });
    }

    res.status(404).json({
      message: "Contact not found",
    });
  } catch (err) {
    next(err);
  }
};

const putOne = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.updateContact(contactId, req.body);

    if (contact) {
      return res.status(200).json({
        message: "Contact was updated",
        data: contact,
      });
    }

    res.status(404).json({
      message: "Contact not found",
    });
  } catch (err) {
    next(err);
  }
};

const patchFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  try {
    const contact = await contactsService.updateContact(contactId, { favorite });

    if (contact) {
      if (favorite) {
        return res.status(200).json({
          message: "Contact has been added to favorites",
          data: contact,
        });
      }
      return res.status(200).json({
        message: "Contact has been removed from favorites",
        data: contact,
      });
    }

    res.status(404).json({
      message: "Contact not found",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
  getOne,
  post,
  deleteOne,
  putOne,
  patchFavorite,
};
