
const listContacts = require("../../model/contacts/listContacts");

const getAllContacts = async (__, res, next) => {
    try {
        const contacts = await listContacts();
        res.json({
            contacts
        });
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts
            }
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = getAllContacts;