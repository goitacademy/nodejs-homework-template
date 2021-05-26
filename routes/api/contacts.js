const express = require("express");
const router = express.Router();
const contacts = require("../../model/contactMethods.js");
const Joi = require("joi");
const { MongoClient, ObjectID, ObjectId } = require("mongodb");

require("dotenv").config();
const uriDB = process.env.DB_HOST;

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const client = await new MongoClient(uriDB, {
    useUnifiedTopology: true,
  }).connect();
  try {
    const result = await client
      .db("db-contacts")
      .collection("contacts")
      .find()
      .toArray();
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  } finally {
    await client.close();
  }
});

router.get(`/:contactId`, async (req, res, next) => {
  const id = req["params"]["contactId"];
  const client = await new MongoClient(uriDB, {
    useUnifiedTopology: true,
  }).connect();
  try {
    const objectId = new ObjectID(id);
    const [result] = await client
      .db("db-contacts")
      .collection("contacts")
      .find({ _id: objectId })
      .toArray();
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  } finally {
    await client.close();
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const client = await new MongoClient(uriDB, {
    useUnifiedTopology: true,
  }).connect();
  try {
    const {
      ops: [result],
    } = await client
      .db("db-contacts")
      .collection("contacts")
      .insertOne({ name, email, phone });
    res.status(201).json({
      status: "success",
      code: 201,
      data: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  } finally {
    await client.close();
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req["params"]["contactId"];
  const client = await new MongoClient(uriDB, {
    useUnifiedTopology: true,
  }).connect();
  try {
    const objectId = new ObjectID(id);
    const { value: result } = await client
      .db("db-contacts")
      .collection("contacts")
      .findOneAndDelete({ _id: objectId });
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  } finally {
    await client.close();
  }
});

router.patch("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;
  const client = await new MongoClient(uriDB, {
    useUnifiedTopology: true,
  }).connect();
  try {
    await schema.validateAsync(req.body);
    const objectId = new ObjectID(id);
    const { value: result } = await client
      .db("db-contacts")
      .collection("contacts")
      .findOneAndUpdate(
        { _id: objectId },
        { $set: { name, email, phone } },
        { returnOriginal: false }
      );
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  } finally {
    await client.close();
  }
});

router.put("/:contactId/favorite", async (req, res, next) => {
  const id = req.params.contactId;
  const { favorite } = req.body;
  const client = await new MongoClient(uriDB, {
    useUnifiedTopology: true,
  }).connect();
  try {
    const objectId = new ObjectID(id);
    const { value: result } = await client
      .db("db-contacts")
      .collection("contacts")
      .findOneAndUpdate(
        { _id: objectId },
        { $set: { favorite } },
        { returnOriginal: false }
      );
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (e) {
    console.error(e);
    next(e);
  } finally {
    await client.close();
  }
});

module.exports = router;
