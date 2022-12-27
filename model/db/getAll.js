const fs = require("fs/promises");
const contactsPath = require("./filePath")

const getAll = async () => {
    const result = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(result) 
}

module.exports = getAll;