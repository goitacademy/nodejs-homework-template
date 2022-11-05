const {Contact} = require("../models/contacts.models")

async function getAll(req, res, next) {
    const contacts = await Contact.find();
    try {
        return res.json({
        data: contacts
    })
    } catch(err) {
        next(err)
    }
}

async function findOneById(req, res, next) {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (contact) {
        return res.json({ data: { contact } });
    }
    return res.status(404).json({ message: 'Not Found' });
    
}


async function create(req, res, next) {
    try {
        const createdContacts = await Contact.create(req.body);
        return res.status(201).json({
            contact: createdContacts     
        })
    } catch(err) {
        next(err)
    }
}

async function deleteById(req, res, next) {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (contact) {
        await Contact.findByIdAndDelete(id)
        return res.json({ data: { contact } });
    }
    return res.status(404).json({ message: 'Not Found' });
}

async function updateById(req, res, next) {
    const { id } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (updateContact) {
        return res.status(201).json({contact: updateContact});
    }
    return res.status(404).json({ message: 'Not Found' });
}

async function updateStatusContact(req, res, next) {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
        contactId,
        { favorite },
        { new: true }
    );
    if (!result) {
        throw new NotFound(`Not found`);
    }
    res.status(200).json({
        status: "success",
        code: 200,
        data: { result },
    })
};

module.exports = {
    getAll,
    create,
    deleteById,
    updateById,
    findOneById,
    updateStatusContact
}