const fs = require("fs/promises");

const isExist = async (path) => {
    return fs
        .access(path)
        .then(() => true)
        .catch(() => false);
};

const createFolder = async (path) => {
    if (!(await isExist(path))) {
        await fs.mkdir(path);
    }
};

const init = async () => {
    await createFolder("tmp");
    await createFolder("public");
    await createFolder("public/avatars");
}

module.exports = { init };