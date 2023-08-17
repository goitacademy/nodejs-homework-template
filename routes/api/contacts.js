const express = require("express");

const router = express.Router();

const contactsFunc = require("../../models/contacts");

router.get("/", contactsFunc.auth, async (req, res, next) => {
  const { page = 1, limit = 20, favorite } = req.query;

  const parsedPage = parseInt(page);
  const parsedLimit = parseInt(limit);

  const list = await contactsFunc.listContacts(
    parsedPage,
    parsedLimit,
    favorite
  );
  console.log("Contacts:");
  console.log(list);
  res.status(200).json(list);
});

router.get("/:contactId", contactsFunc.auth, async (req, res, next) => {
  const contact = await contactsFunc.getContactById(req.params.contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", contactsFunc.auth, async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "missing required name - field",
    });
  }

  const newContact = contactsFunc.addContact(req.body);

  res.status(201).json(newContact);
});

router.delete("/:contactId", contactsFunc.auth, async (req, res, next) => {
  const { contactId } = req.params;

  const contacts = await contactsFunc.listContacts();
  const newContacts = await contactsFunc.removeContact(String(contactId));

  if (newContacts.length === contacts.length) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  res.status(200).json({
    message: `contact deleted`,
  });
});

router.put("/:contactId", contactsFunc.auth, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }
  const updateContact = await contactsFunc.updateContact(contactId, req.body);

  if (updateContact.message === "validationError") {
    return res
      .status(404)
      .json({ message: "validation failed, " + updateContact.err.message });
  }
  if (!updateContact) {
    return res.status(404).json({ message: "not found" });
  }
  return res.status(200).json({ message: "contact updated" });
});

router.patch(
  "/:contactId/favorite",
  contactsFunc.auth,
  async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (!favorite) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const updateStatus = await contactsFunc.updateStatusContact(
      contactId,
      req.body
    );
    if (updateStatus.message === "validationError") {
      return res
        .status(404)
        .json({ message: "validation failed, " + updateStatus.err.message });
    }
    if (!updateStatus) {
      return res.status(404).json({ message: "not found" });
    }
    return res.status(200).json(updateStatus);
  }
);

router.post("/users/signup", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Registration validation error" });
  }
  const newUser = await contactsFunc.signup(email, password);
  if (newUser.message === "Email in use") {
    return res.status(409).json({ message: "Email in use" });
  }

  return res.status(201).json(newUser);
});

router.post("/users/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "please enter email and password" });
  }

  try {
    const loginResult = await contactsFunc.login(email, password);

    if (loginResult.message === "401") {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    if (loginResult.message === "400") {
      return res.status(400).json({ message: "Registration validation error" });
    }
    const token = loginResult.token;
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/users/logout", contactsFunc.auth, async (req, res, next) => {
  try {
    if (!req.user.id) {
      return res.status(400).json({ message: "You're not logged in" });
    }
    await contactsFunc.logout(req.user.id);
    req.user = null;
    return res.status(204).json({ message: "No Content" });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/users/current", contactsFunc.auth, async (req, res, next) => {
  try {
    console.log(req.user);
    res.status(200).json({
      email: req.user.email,
      subscription: req.user.subscription,
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.patch("/users", contactsFunc.auth, async (req, res, next) => {
  const { subscription } = req.body;
  const allowedSubscriptions = ["starter", "pro", "business"];
  if (!allowedSubscriptions.includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription value" });
  }

  const user = req.user;

  try {
    user.subscription = subscription;
    await user.save();
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error updating subscription" });
  }
});

module.exports = router;
