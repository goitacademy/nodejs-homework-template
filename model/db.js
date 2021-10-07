const fs = require('fs/promises')
const path = require('path')

class apiWorkFile {
  constructor(file) {
    this.store = path.join(__dirname, file)
  }

  async readFile() {
    const result = await fs.readFile(this.store, 'utf8')
    const data = JSON.parse(result)
    return data
  }

  async writeFile(data) {
    await fs.writeFile(this.store, JSON.stringify(data, null, 2))
  }
}

module.exports = apiWorkFile