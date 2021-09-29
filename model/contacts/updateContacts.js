/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable eol-last */
// eslint-disable-next-line quotes

const fs = require('fs/promises')
const path = require("path")

const productsPath = path.join(__dirname, 'contacts.json')

const updateContacts = async(contacts) => {
    await fs.writeFile(productsPath, JSON.stringify(contacts))
}

module.exports = updateContacts