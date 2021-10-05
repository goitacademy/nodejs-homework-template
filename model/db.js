const fs = require("fs/promises");
const pah = require("path");

class FileAdapter {
  constructor(file) {
    this.store = pah.join(__dirname, file);
  }

  async read() {
    const result = await fs.readFile(this.store, "utf-8");
    const data = JSON.parse(result);
    return data;
  }

  async write(data) {
    await fs.writeFile(this.store, JSON.stringify(data));
  }
}

module.exports = FileAdapter;
