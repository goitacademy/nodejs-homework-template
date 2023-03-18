const { getContactById } = require('../../service/contacts')


const getContactsById = async (req, res, next) => {
    const { contactId } = req.params
    const data = await getContactById(contactId);

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

module.exports = getContactsById