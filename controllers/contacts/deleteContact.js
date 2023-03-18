const { removeContact } = require('../../service/contacts')


const deleteContact = async (req, res, next) => {
    const { contactId } = req.params
    const result = await removeContact(contactId);

    if (result === -1) {
        res.status(404).json({ message: 'Not found' })
        return
    }

    res.status(200).json({
        message: 'contact deleted'
    })
}

module.exports = deleteContact