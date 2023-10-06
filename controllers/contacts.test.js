const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("./contacts");
const Contact = require("../models/contact");
const HttpError = require("../helpers/HttpError");
const app = require("../app");
const mongoose = require("mongoose");
const { TEST_DB_HOST } = process.env;

describe("Contact Controllers", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(80);
    await mongoose.connect(TEST_DB_HOST);
  });
  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getAllContacts", () => {
    it("should get all contacts for the authenticated user with pagination and filter by favorite", async () => {
      const req = {
        user: { _id: "user_id" },
        query: { page: 1, limit: 10, favorite: true },
      };
      const res = { json: jest.fn() };
      const next = jest.fn();

      jest.spyOn(Contact, "find").mockResolvedValueOnce([]);

      await getAllContacts(req, res, next);
    });
  });

  describe("getContactById", () => {
    it("should get a contact by ID", async () => {
      const req = { params: { id: "contact_id" } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      const findByIdSpy = jest
        .spyOn(Contact, "findById")
        .mockResolvedValue(null);

      try {
        await getContactById(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe(`Contact with ${req.params.id} not found`);
      }

      expect(findByIdSpy).toHaveBeenCalledWith(req.params.id);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("addContact", () => {
    it("should add a new contact", async () => {
      const req = {
        user: { _id: "user_id" },
        body: { name: "John Doe" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      const createSpy = jest
        .spyOn(Contact, "create")
        .mockResolvedValue(req.body);

      await addContact(req, res, next);

      expect(createSpy).toHaveBeenCalledWith({
        ...req.body,
        owner: req.user._id,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });

  describe("updateContact", () => {
    it("should update a contact by ID", async () => {
      const req = {
        params: { id: "contact_id" },
        body: { name: "Updated Name" },
      };
      const res = { json: jest.fn() };
      const next = jest.fn();

      const findByIdAndUpdateSpy = jest
        .spyOn(Contact, "findByIdAndUpdate")
        .mockResolvedValue(null);

      try {
        await updateContact(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe(`Contact with ${req.params.id} not found`);
      }

      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(
        req.params.id,
        req.body,
        { new: true }
      );
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("removeContact", () => {
    it("should remove a contact by ID", async () => {
      const req = { params: { id: "contact_id" } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      const findByIdAndRemoveSpy = jest
        .spyOn(Contact, "findByIdAndRemove")
        .mockResolvedValue(null);

      try {
        await removeContact(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe(`Contact with ${req.params.id} not found`);
      }

      expect(findByIdAndRemoveSpy).toHaveBeenCalledWith(req.params.id);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe("updateFavorite", () => {
    it("should update the favorite status of a contact by ID", async () => {
      const req = { params: { id: "contact_id" }, body: { favorite: true } };
      const res = { json: jest.fn() };
      const next = jest.fn();

      const findByIdAndUpdateSpy = jest
        .spyOn(Contact, "findByIdAndUpdate")
        .mockResolvedValue(null);

      try {
        await updateFavorite(req, res, next);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe(`Contact with ${req.params.id} not found`);
      }

      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(
        req.params.id,
        req.body,
        { new: true }
      );
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
