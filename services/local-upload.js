const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp"); // пакет, который позволяет работать с изображениями, обрабатывать и трансформировать их

const createFolderIsNotExist = require("../helpers/create-folder"); // создание папки для аватарок при запуске сервера, если она не существует;

class UploadAvatarService {
  constructor(folderAvatars) {
    this.folderAvatars = folderAvatars; // создание для каждого пользователя отдельной папки с его аватарками
  }

  async transformAvatar(pathFile) {
    const picture = await jimp.read(pathFile); // pathFile - приходит имя файла; jimp - читает файл

    await picture
      .autocrop()
      .cover(
        250, // autocrop - свойство для автоматической обрезки аватарки;
        250, //  cover или contain, и задаем размеры аватарки,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE // наложение битовой маски, битовые операции - биты складывает в байты, и по битам в байте смотрит позиционирование, указываем из какого места изображения нужно сделать обрезку
      )
      .writeAsync(pathFile); // и записываем асинхронно полученный результат
  }

  async saveAvatar({ idUser, file }) {
    await this.transformAvatar(file.path); // оттрансформированное фото, file.path - место, где он сейчас лежит (папка uploads)

    const folderUserAvatar = path.join(this.folderAvatars, idUser); // создаем новую папку для каждого пользователя для хранение его аватарок

    await createFolderIsNotExist(folderUserAvatar); // проверка первый раз или нет пользователь загружает свою аватарку

    await fs.rename(file.path, path.join(folderUserAvatar, file.filename)); // переименование аватарки и перенос в другую папку

    return path.normalize(path.join(idUser, file.filename)); // возвращаем новый URL
  } // получаем URL - путь, где хранится ссылка, путь к нашему файлу, и он принимает объект c id пользователя, чтобы складывать его аватарки в его папку; и также общий файл с информацией о файле -  req.file - мало ли что может потом понадобиться . Специфика этого URL в том, что он должен храниться в базе данных
}

module.exports = UploadAvatarService;
