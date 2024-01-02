const {catchAsync, HttpError} = require('../helpers');
const {contactService} = require('../service')

exports.getContacts = catchAsync(async (req, res) => {
    const {contacts, total} = await contactService.listContacts(req.query, req.user);
    res.json({
        contacts,
        total,
    });
});

exports.addContacts = catchAsync(async (req, res) => {
    res.status(201).json(await contactService.addContact(req.body, req.user));
});

exports.getContactById = catchAsync(async (req, res) => {
    const contact = await contactService.getContactById(req.params.contactId);
    if(!contact) throw new HttpError(404)
    res.json(contact);
});

exports.deleteContact = catchAsync(async (req, res) => {
    const contact = await contactService.removeContact(req.params.contactId);
    if (!contact) throw new HttpError(404);
    res.json({ message: 'contact deleted' });
});

exports.updateContact = catchAsync(async (req, res) => {
    const contact = await contactService.updateContact(req.params.contactId, req.body);
    if (!contact) throw new HttpError(404);
    res.json(contact);
});

exports.updateStatus = catchAsync(async (req, res) => {
    const contact = await contactService.updateStatusContact(req.params.contactId, req.body);
    if (!contact) throw new HttpError(404);
    res.json(contact);
})