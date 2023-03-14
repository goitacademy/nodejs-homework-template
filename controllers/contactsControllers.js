const { getListContacts, getContactById, addContact, removeContact, updateContact } = require('../service')

const { catchAsync } = require('../utils')


const getContacts = catchAsync(async (req, res, next) => {
    const data = await getListContacts();
    res.json({
        status: 'success',
        code: 200,
        data,
    })
});

const getContactsById = catchAsync(async (req, res, next) => {
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

});

const addNewContact = catchAsync(async (req, res, next) => {
    const { name, email, phone } = req.body
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

    const data = await addContact({ name, email, phone });
    res.status(201).json({
        status: 'success',
        code: 201,
        data,
    })
})

const deleteContact = catchAsync(async (req, res, next) => {
    const { contactId } = req.params
    const result = await removeContact(contactId);

    if (result === -1) {
        res.status(404).json({ message: 'Not found' })
        return
    }

    res.status(200).json({
        message: 'contact deleted'
    })
})

const changeContact = catchAsync(async (req, res, next) => {
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
});

const updateStatus = catchAsync(async (req, res, next) => {
    const { contactId } = req.params
    const { favorite = false } = req.body

    if (!favorite) {
        res.status(400).json({ message: 'missing field favorite' })
        return
    }

    const data = await updateContact(contactId, { favorite })

    if (data) {
        res.json({
            status: 'success',
            code: 200,
            data,
        })
    } else {
        res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found contact id: ${contactId}`,
            data: 'Not Found',
        })
    }

});


module.exports = {
    getContacts,
    getContactsById,
    addNewContact,
    deleteContact,
    changeContact,
    updateStatus
}