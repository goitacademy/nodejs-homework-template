const contactsService = require("../services/contacts");

const getAll = async (req, res, next) => {
  try {
    const { id } = req.user;
    const contacts = await contactsService.getAllContacts(id, req.query);
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { contactId } = req.params;
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

const addOne = async (req, res, next) => {
  try {
    const { id } = req.user;
    const newContact = await contactsService.createContact(id, req.body);

    if (!newContact) {
      return res.status(409).json({
        message: "An identical contact is already in this user's collection.",
      });
    }

    res.status(201).json({
      message: "Contact was created",
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { contactId } = req.params;
    const contact = await contactsService.deleteContact(userId, contactId);

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

const changeData = async (req, res, next) => {
  try {
    const { contactId } = req.params;
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

const changeValueOfFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
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
  getAll,
  getOne,
  addOne,
  deleteOne,
  changeData,
  changeValueOfFavorite,
};
