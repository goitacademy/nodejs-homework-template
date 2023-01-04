const { Contact } = require('../db/contactModel')

const getContacts = async (owner) => {
    try {
        const contacts = await Contact.find({owner})
        return contacts;
    } catch (error) {
        console.log(error)
    }
}

const getContactById = async (contactId, owner) => {
    try {
        const contact = await Contact.findOne({_id: contactId, owner})
        if (!contact) {
            return null
        };
        return contact
    } catch (error) {
        console.log(error)
    }
}

const addContact = async (body, owner) => {
    const { name, email, phone, favorite } = body
    try {
        const contact = new Contact({ name, email, phone, favorite, owner })
        await contact.save()
        return contact
    } catch (error) {
        console.log(error)
    }
}

const removeContact = async (contactId, owner) => {
    try {
        const contact = await Contact.findOneAndRemove({_id: contactId, owner})
        if (!contact) {
            return null
        }
        return contact
    } catch (error) {
        console.log(error)
    }
}

const updateContact = async (contactId, body, owner) => {
    try {
        const contactUpdate = await Contact.findOneAndUpdate(
            {_id: contactId, owner},
            { $set: body },
            { new: true }) 
        return contactUpdate
    } catch (error) {
        console.log(error)
    }
}

const updateStatusContact = async (contactId, favorite, owner) => {
    try {
        const contactUpdateStatus = await Contact.findOneAndUpdate(
            {_id: contactId, owner},
            favorite,
            { new: true })
        return contactUpdateStatus
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}

// const getContacts = async () => {
//     try {
//         const contacts = await Contact.find({})
//         return contacts;
//     } catch (error) {
//         console.log(error)
//     }
// }

// const getContactById = async (id) => {
//     try {
//         const contact = await Contact.findById(id)
//         if (!contact) {
//             return null
//         };
//         return contact
//     } catch (error) {
//         console.log(error)
//     }
// }

// const addContact = async ({name, email, phone, favorite}) => {
//     try {
//         const contact = new Contact({ name, email, phone, favorite })
//         await contact.save()
//         return contact
//     } catch (error) {
//         console.log(error)
//     }
// }
// const removeContact = async (id) => {
//     try {
//         const contact = await Contact.findByIdAndRemove(id)
//         if (!contact) {
//             return null
//         }
//         return contact
//     } catch (error) {
//         console.log(error)
//     }
// }
// const updateContact = async (id, body) => {
//     try {
//         const contactUpdate = await Contact.findByIdAndUpdate(
//             id,
//             { $set: body },
//             { new: true }) 
//         return contactUpdate
//     } catch (error) {
//         console.log(error)
//     }
// }
// const updateStatusContact = async (id, favorite) => {
//     try {
//         const contactUpdateStatus = await Contact.findByIdAndUpdate(
//             id,
//             favorite,
//             { new: true })
//         return contactUpdateStatus
//     } catch (error) {
//         console.log(error)
//     }
// }