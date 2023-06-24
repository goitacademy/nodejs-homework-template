const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controller/contactController");
const express = require("express");
const router = express.Router();

const {
  userRegister,
  logIn,
  getUserDetails,
  logOutUser,
} = require("../../controller/userController");
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");
const uploadDir = path.join(process.cwd(), "../../public/avatars");
const storeImage = path.join(process.cwd(), "images");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cd) => {
    return req.user._id + "_" + file.originalname;
  },
});
const upload = multer({ dest: storage });

// Sign up
router.post("/users/register", userRegister);

// Sign in
router.post("/users/signin", logIn);

// User info
router.get("/users/current", auth, getUserDetails);

// Log out
router.get("/users/logout", auth, logOutUser);

// Get contacts
router.get("/contacts", auth, listContacts);

// Get contacts by id
router.get("/contacts/:contactId", auth, getContactById);

// Add contact
router.post("/contacts", auth, addContact);

// Remove contact
router.delete("/contacts/:contactId", auth, removeContact);

// Update contact
router.put("/contacts/:contactId", auth, updateContact);

// Update status
router.patch("/contacts/:contactId/favorite", auth, updateStatusContact);

// Upload avatar
router.patch(
  "/users/avatars",
  upload.single("picture"),
  async (req, res, next) => {
    const { description } = req.body;
    const { path: tempPathName, originalname, filename, mimetype } = req.file;
    const fileName = path.join(storeImage, filename);
    try {
      await fs.rename(tempPathName, fileName);
    } catch (err) {
      await fs.unlink(tempPathName);
      console.log(err);
    }

    res.json({
      description,
      message: "Plik załadowany pomyślnie",
      status: 200,
    });
  }
);

module.exports = router;
