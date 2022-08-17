const { Contact } = require("../../models");

const addContact = async ( body, id ) => {
    try {
        const data = await Contact.create({ ...body, owner: id });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = addContact;
