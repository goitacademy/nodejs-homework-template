const { Contact } = require("../../models/contacts");

async function listContacts(skip, limit, favorite) {
    const queryParams = {};
    if (favorite) {
        queryParams.favorite = favorite;
    }
    
    return await Contact.find(queryParams)
    .skip(skip)
    .limit(limit)
    .populate("owner");
}

module.exports = {listContacts}