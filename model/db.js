const { read, write } = require('fs')
const fs = require('fs/promises')
const path = require('path')

class FileAdapter {
    constructor(file) {
        this.file = path.join(__dirname, file)
    }

    async read() {
        const res = await fs.readFile(this.file, 'utf8')
        const data = JSON.parse(res)
        return data
    }

    async write(data) {
        await fs.writeFile(this.file, JSON.stringify(data))
    }
}

module.exports = FileAdapter;