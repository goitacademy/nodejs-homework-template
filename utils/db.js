const fs = require('fs/promises')
const path = require("path")

const contactsPath = path.join(__dirname, 'contacts.json');
 
 const readDB = async () => {
    const rawJson = await fs.readFile(contactsPath);
  return JSON.parse(rawJson);
}

const writeDb = async (data) => {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

}

module.exports = (readDB, writeDb);