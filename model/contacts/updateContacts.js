const fs = require("fs/promises");

const filePath = require("./filePath");

const updateProducts = async(contacts)=> {
    await fs.writeFile(filePath, JSON.stringify(contacts));
}

module.exports = updateProducts;