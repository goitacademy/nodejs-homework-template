const fs = require('fs').promises

const contactsPath = require('./contactsPath')

async function updateSourceFile(instance) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(instance, null, 2))
  } catch (error) {
    console.log(error)
  }
}
module.exports = updateSourceFile
