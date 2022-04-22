const contactRepository = require('../../repository/contacts');
const { HTTP_STATUS_CODE } = require('../../libs/constants')

const listContacts = async (req, res, next) => {
  const contacts = await contactRepository.listContacts();
  res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contacts } });
}

const getContactById = async (req, res, next) => {
  const contact = await contactRepository.getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contact } });
  }
  return res
    .status(HTTP_STATUS_CODE.NOT_FOUND)
    .json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: 'Not Fount' });
}

const addContact = async (req, res, next) => {
  const contact = await contactRepository.addContact(req.body);
  res.status(HTTP_STATUS_CODE.CREATED).json({ status: 'success', code: HTTP_STATUS_CODE.CREATED, payload: { contact } });
}

const removeContact =
  async (req, res, next) => {
    const contact = await contactRepository.removeContact(req.params.contactId);
    if (contact) {
      return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contact } });
    }
    return res
      .status(HTTP_STATUS_CODE.NOT_FOUND)
      .json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: 'Not Fount' });
  }


const updateContact =
  async (req, res, next) => {
    const contact = await contactRepository.updateContact(
      req.params.contactId,
      req.body,
    );
    if (contact) {
      return res.json({ status: 'success', code: HTTP_STATUS_CODE.OK, payload: { contact } });
    }
    return res
      .status(HTTP_STATUS_CODE.NOT_FOUND)
      .json({ status: 'error', code: HTTP_STATUS_CODE.NOT_FOUND, message: 'Not Fount' });
    }
  
    module.exports = {listContacts, getContactById, removeContact, addContact, updateContact}