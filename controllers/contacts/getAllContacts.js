const {Contact} = require("../../models/index")

// const contactsOperations = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
    const contacts = await Contact.find({});
    res.json({
            status: 'success',
            code: 200,
            data: {
                result: contacts
            }
        })
    // try {
    //     const contacts = await contactsOperations.listContacts();
    //     res.json({
    //         status: 'success',
    //         code: 200,
    //         data: {
    //             contacts
    //         }
    //     })
    // } catch (error) {
    //     next(error);
    // }
}

module.exports = getAllContacts;