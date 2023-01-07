import fs from 'fs/promises';

const loadFile = async (filePath) => {
    const file = await fs.readFile(filePath, { encoding: "utf-8" });

    return file;
};
const saveFile = async (filePath, data) => {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData);
};

export {
    loadFile,
    saveFile,
};