const fs = require("fs").promises;
const path = require("path");

// Ścieżka do folderu tmp w folderze middlewares
const tmpDir = path.join(__dirname, "../tmp"); // Ścieżka do folderu tmp

// Sprawdzamy, czy folder tmp istnieje, jeśli nie - tworzymy go
async function ensureTmpDirExists() {
  try {
    // Próba dostępu do folderu
    await fs.access(tmpDir);
  } catch (error) {
    // Jeśli folder nie istnieje, utwórz go
    await fs.mkdir(tmpDir);
    console.log("Folder tmp został utworzony.");
  }
}

// Konfiguracja multer do zapisywania plików w folderze tmp
const multer = require("multer");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // Upewniamy się, że folder tmp istnieje
    await ensureTmpDirExists();
    cb(null, tmpDir); // Zapisz plik w folderze tmp
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
