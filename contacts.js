const contactsModel = require('./models/contacts')
const { bodySchema } = require('./routes/api/valid-contact')

// /**
//  * GET /api/contacts
//  * @returns повертає масив всіх контактів в json-форматі зі статусом 200
//  */
// const listContacts = async (req, res, next) => {
//     try {
//         const contacts = await contactsModel.listContacts()
//         return res.json({
//             status: "success",
//             code: 200,
//             data: { contacts },
//         })
//     } catch (err) {
//         next(err)
//     }
// }

// /**
//  * GET /api/contacts/:id
//  * Отримує параметр id
//  * @returns якщо такий id є, повертає об'єкт контакту в json-форматі зі статусом 200
//  * @returns якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
//  */
// const getContactById = async (req, res, next) => {
//     const contactId = req.params.contactId

//     try {
//         const contact = await contactsModel.getContactById(contactId)

//         if (contact) {
//             return res.json({
//                 status: "success",
//                 code: 200,
//                 data: { contact },
//             })
//         } else {
//             return res.status(404).json({
//                 status: "error",
//                 code: 404,
//                 message: "Not found",
//             })
//         }
//     } catch (err) {
//         next(err)
//     }
// }


// /**
//  * POST /api/contacts
//  * Отримує body в форматі {name, email, phone}
//  * @returns якщо в body немає якихось полів, повертає json з ключем {"message": "missing required name field"} і статусом 400
//  * @returns якщо з body все добре, додає унікальний ідентифікатор в об'єкт контакту
//  * @returns за результатом роботи функції повертає об'єкт з доданим id {id, name, email, phone} і статусом 201
//  */
// const addContact = async (req, res, next) => {
//     try {
//         const validContact = bodySchema.validate(req.body)

//         if (validContact.error) {
//             return res.status(400).json({
//                 status: 'error',
//                 code: 400,
//                 message: validContact.error.details[0].message,
//             })
//         }

//         const contacts = await contactsModel.addContact(req.body)

//         if (contacts) {
//             return res.status(201).json({
//                 status: "success",
//                 code: 201,
//                 data: { contacts }
//             })
//         } else {
//             return res.status(400).json({
//                 status: "error",
//                 code: 400,
//                 message: "missing required name field",
//             })
//         }
//     } catch (err) {
//         next(err)
//     }
// }

/**
 * DELETE /api/contacts/:id
 * Отримує параметр id
 * @returns якщо такий id є, повертає json формату {"message": "contact deleted"} і статусом 200
 * @returns якщо такого id немає, повертає json з ключем "message": "Not found" і статусом 404
 */
const removeContact = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const contact = await contactsModel.removeContact(contactId)

        if (contact) {
            return res.status(200).json({
                status: "success",
                code: 200,
                data: { message: "contact deleted" }
            })
        } else {
            return res.status(404).json({
                status: "error",
                code: 404,
                message: "Not found"
            })
        }
    } catch (err) {
        next(err)
    }
}

/**
 * PUT /api/contacts/:id
 * Отримує параметр id
 * Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
 * @returns якщо body немає, повертає json з ключем {"message": "missing fields"} і статусом 400
 * @returns за результатом роботи функції повертає оновлений об'єкт контакту і статусом 200.
 * @returns в іншому випадку, повертає json з ключем "message": "Not found" і статусом 404
 */
const updateContact = async (req, res, next) => {
    const validContact = bodySchema.validate(req.body)

    if (validContact.error) {
        return res.status(400).json({
            status: validContact.error.details
        })
    }

    const contactId = req.params.contactId
    const body = req.body

    try {
        const updateContact = await contactsModel.updateContact(contactId, body)

        if (updateContact) {
            return res.status(200).json({
                status: "success",
                code: 200,
                data: updateContact,
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Not found'
            })
        }
    } catch (err) {
        next(err)
    }
}

/**
 * PATCH /api / contacts /:id/ favorite
 * Отримує body в json-форматі c оновленням поля favorite
 * @returns якщо body немає, повертає json з ключем {"message": "missing field favorite"} і статусом 400
 * @returns за результатом роботи функції повертає оновлений об'єкт контакту і статусом 200.
 * @returns в іншому випадку, повертає json з ключем "message": "Not found" і статусом 404
 */
const updateStatusContact = async (req, res, next) => {
    const validContact = bodySchema.validate(req.body)

    if (validContact.error || !req.body.favorite) {
        return res.status(400).json({
            status: validContact.error.details,
            message: "missing field favorite",
        })
    }

    const contactId = req.params.contactId
    const body = req.body

    try {
        const updateStatusContact = await contactsModel.updateStatusContact(contactId, body)

        if (updateStatusContact) {
            return res.status(200).json({
                status: "success",
                code: 200,
                data: updateStatusContact,
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Not found'
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
}