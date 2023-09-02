const { contactsService } = require('../../service');
const { schemaAddContact, schemaUpdateContact, schemaUpdateFavoriteContact } = require('../../middlewares/joiValidation');

const listContacts = async (req, res, next) => {
  try {
    const results = await contactsService.listContacts();
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unknown error" })
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `Not found contact id: ${contactId}`,
        data: 'Bad request',
      })
    }
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contact: contact,
      },
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unknown error" })
  }
};

const addContact = async (req, res, next) => {
  try {
    const body = await schemaAddContact.validateAsync(req.body);
    const result = await contactsService.addContact({ body });
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact: result,
      },
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unknown error" })
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `Not found contact id: ${contactId}`,
        data: 'Bad request',
      })
    }
    const result = await contactsService.removeContact(contactId);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contact: result,
      },
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unknown error" })
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `Not found contact id: ${contactId}`,
        data: 'Bad request',
      })
    }
    const updatedData = await schemaUpdateContact.validateAsync(req.body);
    const result = await contactsService.updateContact(contactId, { updatedData });
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contact: result,
      },
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unknown error" })
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);
    if (!contact) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `Not found contact id: ${contactId}`,
        data: 'Bad request',
      })
    }
    const { error } = schemaUpdateFavoriteContact.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { favorite } = req.body;
    const result = await contactsService.updateStatusContact(contactId, { favorite });
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contact: result,
      },
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Unknown error" })
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};