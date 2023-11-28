const { writeFile, readFile } = require("fs/promises");
const { join } = require("path");

class DatabaseManager {
  constructor(fileName) {
    this.filePath = join(process.cwd(), "models", fileName);
  }

  fetchData = async () => {
    try {
      const fetchData = await readFile(this.filePath);
      return JSON.parse(fetchData);
    } catch (error) {
      console.log(error);
    }
  };

  deleteDataById = async (id) => {
    try {
      const fetchData = await this.fetchData();
      const filteredData = fetchData.filter((contact) => contact.id !== id);
      return filteredData;
    } catch (error) {}
  };
}

const contacts = new DatabaseManager("contacts.json");
const listContacts = async () =>
  contacts.deleteDataById("qdggE76Jtbfd9eWJHrssH");

console.log(listContacts);
module.exports = DatabaseManager;
