const { Contact } = require("../../models");

const getAllContacts = async (_id, favorite, skip, limit) => {
    try {
        const data = await Contact.find(
            { owner: _id, favorite },
            "",
            { skip, limit: Number(limit) }
        ).populate("owner", "_id email subscription");
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getAllContacts;
