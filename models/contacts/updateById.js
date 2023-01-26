const fs = require("fs").promises;
const filePath = require("./filePath");
const getAll = require("./getAll");


const updateById = async(contactId, body)=> {
    const contactList = await getAll();
    const index = contactList.findIndex(item => item.id === contactId);
    
    if(index === -1){
        return null;
    }
    
    contactList[index] = {...body, contactId};
    await fs.writeFile(filePath, JSON.stringify(contactList));
    return contactList[index];
}

module.exports = updateById;