const fs = require("fs/promises");

const path = require("./path");

const getAllContacts = async () => {
    try {
        const data = await fs.readFile(path);

        const contacts = JSON.parse(data);
        return contacts;
    }
    catch (error) {
        throw error;
    }
};

module.exports = getAllContacts;
