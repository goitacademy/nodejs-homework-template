const { addContact } = require('../../service/contacts')


const addNewContact = async (req, res, next) => {
    const { name, email, phone } = req.body

    const { _id } = req.user

    if (!name) {
        res.status(400).json({ message: 'missing required name field' })
        return
    } if (!email) {
        res.status(400).json({ message: 'missing required email field' })
        return
    } if (!phone) {
        res.status(400).json({ message: 'missing required phone field' })
        return
    }

    const data = await addContact({ name, email, phone }, _id);
    res.status(201).json({
        status: 'success',
        code: 201,
        data,
    })
}

module.exports = addNewContact