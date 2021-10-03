const fs = require('fs/promises');
const path = require('path');

class FileAdapter {
  constructor(file) {
    this._store = path.join(__dirname, file);
  }

  async read() {
    const result = await fs.readFile(this._store, 'utf8');
    const data = JSON.parse(result);
    return data;
  }

  async write(data) {
    console.log(data);
    await fs.writeFile(this._store, JSON.stringify(data, null, 2));
  }
}

module.exports = FileAdapter;
