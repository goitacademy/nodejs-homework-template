const express = require("express");
const router = express.Router();

const {
  contactJoiSchema,
  contactSchemaUpdate,
  favoriteSchema,
} = require("../../models/contact");

const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultId = await Contact.findById(contactId); // findOne({_id:contactId}) - спосіб шукати по ID
    
    if (!resultId) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: resultId,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactJoiSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const resultPost = await Contact.create(req.body);
    res.status(201).json({
      status: "saccess ",
      code: 201,
      data: {
        resultPost,
      },
    });
  } catch (error ) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultDelete = await Contact.findByIdAndRemove(contactId);
    if (!resultDelete) {
      throw new NotFound(` not found `);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        resultDelete,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchemaUpdate.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const data = req.body;
    const resultPut = await Contact.findByIdAndUpdate(contactId, data, {
      new: true,
    });
    if (!resultPut) {
      throw new NotFound("missing fields");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        resultPut,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error("Missing field favorite");
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    const resultPut = await Contact.findByIdAndUpdate(contactId,{ favorite },{ new: true });
    if (!resultPut) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        resultPut,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;


