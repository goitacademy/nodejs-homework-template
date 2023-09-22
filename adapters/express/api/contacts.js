const contactService = require("../../../contacts/contacts");

const getContacts = async (req, res, next) => {
  try {
    const results = await contactService.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        results,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactService.getContactById(contactId);

    res.status(200).json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
const postContact = async (req, res, next) => {
  try {
    const { body } = req;
    const contact = await contactService.addContact(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactService.removeContact(contactId);
    res.status(200).json({
      status: "success",
      code: 200,
      message: deleteContact,
    });
  } catch (error) {
    next(error);
  }
};
const putUpdateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const updateContact = await contactService.updateContact(contactId, body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: updateContact,
    });
  } catch (error) {
    next(error);
  }
};
const patchUpdateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const favoriteContact = await contactService.updateStatusContact(
      contactId,
      body
    );
    res.status(200).json({
      status: "succes",
      code: 201,
      data: favoriteContact,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getContacts,
  getContactId,
  postContact,
  deleteContact,
  putUpdateContact,
  patchUpdateFavorite,
};
