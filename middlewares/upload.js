const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;

app.post("/routes/api/contacts", upload.single("image"), async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(contactsDir, originalname);

  try {
    await fs.rename(tempUpload, resultUpload);
    const image = path.join("public", "avatars", originalname);
    const newContact = {
      name: req.body.name,
      id: v4(),
      image,
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
});

app.get("/api/contacts", async (req, res) => {
  res.json(contacts);
});
