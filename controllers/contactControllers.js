const {catchAsync, HttpError} = require('../helpers');
const {listContacts, addContact, getContactById, removeContact, updateContact, updateStatusContact} = require('../service')

exports.getContacts = catchAsync(async (_, res) => {
    res.json(await listContacts());
});

exports.addContacts = catchAsync(async (req, res) => {
    res.status(201).json(await addContact(req.body));
});

exports.getContactById = catchAsync(async (req, res) => {
    const contact = await getContactById(req.params.contactId);
    if(!contact) throw new HttpError(404)
    res.json(contact);
});

exports.deleteContact = catchAsync(async (req, res) => {
    const contact = await removeContact(req.params.contactId);
    if (!contact) throw new HttpError(404);
    res.json({ message: 'contact deleted' });
});

exports.updateContact = catchAsync(async (req, res) => {
    const contact = await updateContact(req.params.contactId, req.body);
    if (!contact) throw new HttpError(404);
    res.json(contact);
});

exports.updateStatus = catchAsync(async (req, res) => {
    const contact = await updateStatusContact(req.params.contactId, req.body);
    if (!contact) throw new HttpError(404);
    res.json(contact);
})