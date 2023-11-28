const { writeFile, readFile } = require("fs/promises");
const { join } = require("path");
const { deleting } = require("./responses/responseMessages");
const { del } = require("express/lib/application");

class DatabaseManager {
  constructor(fileName) {
    this.filePath = join(process.cwd(), "models", fileName);
  }

  writeToDatabase = async (data) => {
    await writeFile(this.filePath, JSON.stringify(data, null, 2));
  };

  fetchData = async () => {
    try {
      const fetchedData = await readFile(this.filePath);
      return JSON.parse(fetchedData);
    } catch (error) {
      console.log(error);
    }
  };

  addData = async () => {

  }

  deleteDataById = async (id) => {
    try {
      const fetchedData = await this.fetchData();
      const idx = fetchedData.findIndex((data) => data.id === id);
      if (idx === -1) {
        return JSON.stringify(deleting.error);
      }
      const filteredData = fetchedData.toSpliced(idx, 1);
      await this.writeToDatabase(filteredData);
      return JSON.stringify(deleting.successed);
    } catch (error) {
      console.log(error);
    }
  };
}

// const contacts = new DatabaseManager("contacts.json");
// const listContacts = async () => {
//   return await contacts.deleteDataById("qdggE76Jtbfd9eWJHrssH");
// };

// (async () => {
//   try {
//     const result = await listContacts();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// })();

module.exports = DatabaseManager;
