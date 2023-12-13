const {catchAsync, HttpError} = require('../helpers');
const contactsDB = require('../models/contacts')

exports.getContacts = catchAsync(async (_, res) => {
    res.json(await contactsDB.listContacts());
});

exports.addContacts = catchAsync(async (req, res) => {
    res.status(201).json(await contactsDB.addContact(req.body));
});

exports.getContactById = catchAsync(async (req, res) => {
    const contact = await contactsDB.getContactById(req.params.contactId);
    if(!contact) throw new HttpError(404, 'Not found')
    res.json(contact);
});

exports.deleteContact = catchAsync(async (req, res) => {
    const contact = await contactsDB.removeContact(req.params.contactId);
    if (!contact) throw new HttpError(404, 'Not found');
    res.json({ message: 'contact deleted' });
});

exports.updateContact = catchAsync(async (req, res) => {
    const contact = await contactsDB.updateContact(req.params.contactId, req.body);
    if (!contact) throw new HttpError(404, 'Not found');
    res.json(contact);
});