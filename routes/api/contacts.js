const express = require("express");
const router = express.Router();

const {
  favouriteContactsList,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
  pagination,
} = require("../../models/contacts");

const {
  signupUser,
  loginUser,
  auth,
  logOutUser,
  addUserContact,
  getUserContacts,
  upload,
  addAvatar,
} = require("../../models/Users");
const { User } = require("../../models/Schemas/UsersSchema");

router.get("/", async (req, res, next) => {
  res.status(200).json({ message: "server is working" });
});

router.get("/contacts", async (req, res) => {
  try {
    const favourite = req.query.favourite;
    if (favourite) {
      const data = await favouriteContactsList(favourite);
      return res.status(data.status).json(data.data);
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const data = await pagination(page, limit);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).json({ message: "Bad Request" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  if (id) {
    res.status(200);
    const contact = await getContactById(id);
    res.json(contact);
  } else {
    res.status(404);
    res.json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.email || !body.phone) {
    res.status(400);
    res.json({ message: "missing required name field" });
    return;
  }
  const data = await addContact(body);
  const { statusCode, message } = data;
  res.status(statusCode);
  res.json(message);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  if (id) {
    res.status(200);
    const data = await removeContact(id);
    res.json(data);
  } else {
    res.status(404);
    res.json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  if (!body) {
    res.status(400);
    res.json({ message: "missing fields" });
  } else {
    const { statusCode, message } = await updateContact(contactId, body);
    res.status(statusCode);
    res.json(message);
  }
});

router.patch("/:contactId/favourite", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  if (!body) {
    res.status(400);
    res.json({ message: "missing field favorite" });
  } else {
    const { statusCode, message } = await updateContactStatus(contactId, body);
    res.status(statusCode);
    res.json(message);
  }
});

router.post("/users/signup", async (req, res) => {
  const body = req.body;
  const data = await signupUser(body);
  const { statusCode, message } = data;
  res.status(statusCode).json(message);
});

router.post("/users/login", async (req, res) => {
  const body = req.body;
  const data = await loginUser(body);
  const { statusCode, message } = data;
  res.status(statusCode).json(message);
});

router.get("/users/logout", logOutUser, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    user.token = null;
    await user.save();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/users/current", auth, (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const responsBody = {
      email: user.email,
      subscription: user.subscription,
    };
    return res.status(200).json({ ResponsBody: responsBody });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/users/contacts", auth, async (req, res) => {
  try {
    const user = req.user;
    const toAddContact = req.body;
    const newContact = await addUserContact(user, toAddContact);
    return res
      .status(newContact.statusCode)
      .json({ message: newContact.message });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/users/contacts", auth, async (req, res) => {
  try {
    const user = req.user;
    const newContact = await getUserContacts(user);
    return res
      .status(newContact.statusCode)
      .json({ message: newContact.message });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/users", auth, async (req, res, next) => {
  try {
    const user = req.user;
    const newSubscription = req.body.subscription;
    user.subscription = newSubscription;
    await user.save();
    return res.status(200).json({ updatedUser: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Bad request" });
  }
});
router.patch(
  "/users/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const newAvatar = req.file;
      const data = await addAvatar(user, newAvatar);
      console.log(data);
      return res.status(200);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Bad request!" });
    }
  }
);

module.exports = router;