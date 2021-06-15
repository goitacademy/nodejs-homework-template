// Multer — это middleware для фреймворка express для обработки multipart/form-data, нужная в первую очередь при загрузке файлов

const fs = require("fs/promises");

// функция будет создавать директорию, если она не существует
// чтобы проверить существует или не существует необходимая папка (чтобы не выдавало ошибку или повторно не создавало туже самую папку) используется fs.access
// fs.access - проверяет есть ли у нас доступ к файлу. Добавляем асинхронную функцию, которая возвращает true или false
const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

module.exports = createFolderIsNotExist;
