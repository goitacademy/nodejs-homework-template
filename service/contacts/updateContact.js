const { Contact } = require("../../models");

const updateContact = async (id, body) => {
    try {
        const data = await Contact.findByIdAndUpdate(id, body, { new: true });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = updateContact;
