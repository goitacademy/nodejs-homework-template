const {Types: {ObjectId}} = require("mongoose")
const Contact = require("./schemas/contacts")

const listContacts = () => Contact.find({}).lean();

const getContactById = (contactId) => {
    let objectIdContactId;
    try {
        objectIdContactId = ObjectId(contactId);
        console.log(objectIdContactId)
    } catch (err) {
        return null;
    }
    return Contact.findOne({ _id: objectIdContactId }).lean();
};



module.exports = {
    listContacts,
    getContactById,
}