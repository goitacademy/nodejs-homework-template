const multer = require('multer');
const path = require('path');

// Folder tymczasowy do przechowywania przesłanych plików
const tempDir = path.join(__dirname, '../tmp');

// Konfiguracja Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir); // Zapis w folderze tmp
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
  }
});

// Filtr plików - akceptujemy tylko obrazy
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Nieprawidłowy format pliku. Dozwolone są tylko obrazy.'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
