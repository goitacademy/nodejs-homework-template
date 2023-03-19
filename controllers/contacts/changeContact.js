const { updateContact } = require('../../service/contacts')



const changeContact = async (req, res, next) => {
    const { contactId } = req.params
    const { name, email, phone } = req.body

    if (!name || !email || !phone) {
        res.status(400).json({ message: 'missing fields' })
        return
    }

    const data = await updateContact(contactId, { name, email, phone });
    if (!data) {
        res.status(404).json({ message: 'Not found' })
        return
    }

    res.json({
        status: 'success',
        code: 200,
        data,
    })
};

module.exports = changeContact