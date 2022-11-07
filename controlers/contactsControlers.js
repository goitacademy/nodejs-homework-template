const {Contact} = require("../Validations/Shema")

async function getAll(req, res, next) {
    try {
        const contacts = await Contact.find();
        return res.json({
        data: contacts
    })
    } catch(err) {
        next(err)
    }
}

async function findOneById(req, res, next) {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        return res.json({ data: { contact } });
    } catch(err) {
        next(err)
        return res.status(404).json({ message: 'Not Found' });
    }    
}


async function create(req, res, next) {
    try {
        const createdContacts = await Contact.create(req.body);
        return res.status(201).json({
            contact: createdContacts     
        })
    } catch(err) {
        next(err)
        return res.status(404).json({ message: err.message });
    }
}

async function deleteById(req, res, next) {
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndDelete(id);
        return res.json({ data: { contact } });
    } catch(err) {
        next(err)
        return res.status(404).json({ message: 'Not Found' });
    }
}

async function updateById(req, res, next) {
    try {
       const { id } = req.params;
        const updateContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(201).json({contact: updateContact});
    } catch(err) {
        next(err)
        return res.status(404).json({ message: err.message });
    }
}

async function updateStatusContact(req, res, next) {
    try {
        const { contactId } = req.params;
        const { favorite } = req.body;
        const result = await Contact.findByIdAndUpdate(contactId,{ favorite },{ new: true });
        return res.status(200).json({ status: "success", code: 200, data: { result }, });
    } catch(err) {
        next(err)
        return res.status(404).json({ message: 'Not Found' });
    }
};

module.exports = {
    getAll,
    create,
    deleteById,
    updateById,
    findOneById,
    updateStatusContact
}