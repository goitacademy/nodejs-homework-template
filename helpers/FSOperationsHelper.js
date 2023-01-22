const fs = require("fs/promises");

function fsOperationCreator(operation, path, additionalErrorMessage = "") {
  return async (data) => {
    try {
      return await (data
        ? operation(path, data, "utf-8")
        : operation(path, "utf-8"));
    } catch (error) {
      const { message } = error;

      console.log(additionalErrorMessage, `\nErr msg: ${message}`);

      throw error;
    }
  };
}

class FSOperationsHelper {
  static init(path) {
    FSOperationsHelper.readDataWrapped = fsOperationCreator(
      fs.readFile,
      path,
      "Can't read data from a file on a disk!"
    );

    FSOperationsHelper.writeDataWrapped = fsOperationCreator(
      fs.writeFile,
      path,
      "Can't write data to a file on a disk!"
    );
  }

  static async readData() {
    return await FSOperationsHelper.readDataWrapped();
  }

  static async writeData(data) {
    await FSOperationsHelper.writeDataWrapped(data);
  }
}

module.exports = FSOperationsHelper;
