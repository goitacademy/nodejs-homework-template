const path = require("path");
const contactsPath = path.join(__dirname, "../models/contacts.json");
const fs = require("fs/promises");

const status = (res, number, type, object) => {
    return res.status(number).json({ type, object });
}

const readDB = async ()=>{
    return  JSON.parse(await fs.readFile(contactsPath, "utf-8"));
}


const writeFileDB = async (newResuit)=>{
    return  JSON.parse(await fs.writeFile(contactsPath, JSON.stringify(newResuit), "utf-8"));
}

module.exports = {
    writeFileDB,
    readDB,
    status
}