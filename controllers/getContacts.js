const fs = require("fs/promises");

const  getContacts = async (pathToDB) => {
    const data = await fs.readFile(pathToDB, "utf8");
    return JSON.parse(data);
}

module.exports = getContacts;
