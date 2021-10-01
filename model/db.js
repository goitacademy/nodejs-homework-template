const fs = require('fs/promises');
const path = require('path');

class FileAdapter {
    constructor(file) {
        this.store = path.join(__dirname, file)
    }

    async read() {
        const result = await fs.readFile(this.store, 'utf8');
        const parseResult = JSON.parse(result);
        return parseResult;
    }

    async write(data) {
        await fs.writeFile(this.store, JSON.stringify(data))
    }
}

module.exports = FileAdapter