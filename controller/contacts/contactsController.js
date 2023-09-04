const { contactsService } = require('../../service');
const { schemaAddContact, schemaUpdateContact, schemaUpdateFavoriteContact } = require('../../middlewares/joiValidation');

const listContacts = async (req, res, next) => {
  try {
    const { query, user } = req;
    const results = await contactsService.listContacts(query, user._id);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { params, user } = req;
    const { contactId } = params;
    const contact = await contactsService.getContactById(contactId, user._id);
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
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schemaAddContact.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { body, user } = req;
    const result = await contactsService.addContact({ ...body, owner: user._id });
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact: result,
      },
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { params, user } = req;
    const { contactId } = params;
    const contact = await contactsService.getContactById( contactId, user._id );
    if (!contact) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `Not found contact id: ${contactId}`,
        data: 'Bad request',
      })
    }
    const result = await contactsService.removeContact(contactId, user._id);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contact: result,
      },
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { params, user } = req;
    const { contactId } = params;
    const contact = await contactsService.getContactById(contactId, user._id);
    if (!contact) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `Not found contact id: ${contactId}`,
        data: 'Bad request',
      })
    }
    const updatedData = await schemaUpdateContact.validateAsync(req.body);
    const result = await contactsService.updateContact(contactId, user._id, { updatedData });
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contact: result,
      },
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemaUpdateFavoriteContact.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { params, user } = req;
    const { contactId } = params;
    const contact = await contactsService.getContactById(contactId, user._id);
    if (!contact) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: `Not found contact id: ${contactId}`,
        data: 'Bad request',
      })
    }
    const { favorite } = req.body;
    const result = await contactsService.updateStatusContact(contactId, user._Id, { favorite });
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contact: result,
      },
    })
  } catch (err) {
    console.error(err);
    next(err);
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