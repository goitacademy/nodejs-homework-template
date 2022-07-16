const fs = require('fs/promises');
const { join } = require('path');

class DataBase {
  constructor(data) {
    this.data = data;
  }

  async read() {
    const content = await fs.readFile(join(__dirname, this.data), 'utf-8');
    return JSON.parse(content);
  }

  async write(data) {
    await fs.writeFile(
      join(__dirname, this.data),
      JSON.stringify(data, null, 2)
    );
  }
}

module.exports = DataBase;
