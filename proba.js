const multer = require('multer');
const jimp = require('jimp');
const fs = require('fs/promises');
const path = require('path');

const storage = multer.memoryStorage(); // Загружаємо файл в пам'ять, а не на диск

const uploadAvatar = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, // Максимальний розмір файлу (1 MB)
  },
  fileFilter: (req, file, cb) => {
    // Перевірка типу файлу (зображення)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
  },
});

// Додана логіка для збереження файлів у папці tmp
const saveToTmp = async (file) => {
  const tmpPath = path.join(__dirname, '..', 'tmp'); // Шлях до папки tmp в корені проекту
  const uniqueFileName = `${Date.now()}-${file.originalname}`;

  // Зберігаємо файл у папці tmp
  await fs.writeFile(path.join(tmpPath, uniqueFileName), file.buffer);

  return uniqueFileName;
};

const processAvatar = async (file) => {
  // Обробляємо аватарку за допомогою jimp та встановлюємо розміри 250 на 250
  const image = await jimp.read(file.buffer);
  await image.resize(250, 250).write(file.buffer);

  return file;
};

// Додана логіка для переміщення файлів у папку public/avatars
const moveToAvatars = async (file, uniqueFileName) => {
  const avatarsPath = path.join(__dirname, '..', 'public', 'avatars');

  // Переміщаємо аватарку з папки tmp в папку public/avatars
  await fs.rename(path.join(__dirname, '..', 'tmp', uniqueFileName), path.join(avatarsPath, uniqueFileName));

  return uniqueFileName;
};

module.exports = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file || !file.path) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uniqueFileName = await saveToTmp(file);
    const processedFile = await processAvatar(file);
    const finalFileName = await moveToAvatars(processedFile, uniqueFileName);

    // Оновлюємо поле avatarURL користувача
    req.user.avatarURL = `/avatars/${finalFileName}`;

    // Продовжуємо обробку запиту
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = uploadAvatar;