const fs = require("fs/promises");

const path = require("./path");

const updateContacts = async (contacts) => {
    const contactsString = JSON.stringify(contacts);
    await fs.writeFile(path, contactsString)
};

    module.exports = updateContacts;