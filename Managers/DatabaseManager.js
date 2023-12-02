const { writeFile, readFile } = require("fs/promises");
const { join } = require("path");

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
      throw new Error(`something went wrong ${error}`);
    }
  };

  addData = async (data) => {
    try {
      const fetchedData = await this.fetchData();
      fetchedData.push(data);
      await this.writeToDatabase(fetchedData);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  deleteDataById = async (id) => {
    try {
      const fetchedData = await this.fetchData();
      const idx = fetchedData.findIndex((data) => data.id === id);
      if (idx === -1) {
        return -1;
      }
      const filteredData = fetchedData.toSpliced(idx, 1);
      await this.writeToDatabase(filteredData);
      return 1;
    } catch (error) {
      throw new Error(`something went wrond, ${error}`);
    }
  };

  updateDataById = async (id, data) => {
    const fetchedData = await this.fetchData();
    const idx = fetchedData.findIndex((contact) => contact.id === id);
    if (!idx) return null;
    fetchedData[idx] = { ...fetchedData[idx], ...data };
    await this.writeToDatabase(fetchedData);
    return fetchedData[idx];
  };
}

module.exports = DatabaseManager;
