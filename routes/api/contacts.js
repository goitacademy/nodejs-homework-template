const express = require("express");
const { Contact, schemas } = require("../../models/contact");
const { RequestError, ctrlWrapper } = require("../../helpers");
const { validateBody, auth } = require("../../middlewares");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getAll));

router.get("/:id", auth, ctrlWrapper(getById));

router.post("/", auth, validateBody(schemas.add), ctrlWrapper(add));

router.delete("/:id", auth, ctrlWrapper(remove));

router.put("/:id", auth, validateBody(schemas.update), ctrlWrapper(update));

router.patch(
    "/:id/favorite",
    auth,
    validateBody(schemas.updateFavorite),
    ctrlWrapper(update)
);

async function add(req, res) {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
}

async function getAll(req, res) {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite = [true, false] } = req.query;
    const result = await Contact.find(
        { owner, favorite },
        "-createdAt -updatedAt",
        { skip: (page - 1) * limit, limit }
    ).populate("owner", "email");
    res.status(200).json(result);
}

async function getById(req, res) {
    const { id } = req.params;
    // const result = await Contact.findOne({ _id: id });
    const result = await Contact.findById(id);
    if (!result) throw RequestError(404, "Not found");

    res.status(200).json(result);
}

async function remove(req, res) {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) throw RequestError(404, "Not found");

    res.status(204).json({ message: "contact deleted" });
}

async function update(req, res) {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) throw RequestError(404, "Not found");

    res.status(200).json(result);
}

module.exports = router;
