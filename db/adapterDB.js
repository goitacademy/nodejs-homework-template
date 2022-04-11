const fs = require('fs/promises')
const { join } = require('path')

class AdapterDB {
  constructor(file) {
    this.file = file
  }

  async read() {
    const contacts = await fs.readFile(join(__dirname, this.file), 'utf8')
    return JSON.parse(contacts)
  }

  async write(data) {
    await fs.writeFile(
      join(__dirname, this.file),
      JSON.stringify(data, null, 2),
    )
  }
}

module.exports = AdapterDB
