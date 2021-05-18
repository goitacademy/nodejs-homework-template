const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { User, contacts, newContact } = require("../model/__mocks__/data");

require("dotenv").config();

JWT_SECRET_KEY = process.env.JWT_SECRET;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User._id }, JWT_SECRET_KEY);
User.token = token;

jest.mock("../model/contacts.js");
jest.mock("../model/users.js");

describe("Testing the route api/contacts", () => {
  let idNewContact = null;
  describe("should handle GET request", () => {
    test("should return 200 status for GET: /contacts", async (done) => {
      const res = await request(app)
        .get("/api/contacts")
        .set("Authorization", `Bearer ${token}`); //имитация авторизации
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
      done();
    });

    test("should return 200 status for GET: /contacts/:id", async (done) => {
      const contact = contacts[0];

      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact._id).toBe(contact._id);

      done();
    });

    test("should return 404 status for GET: /contacts/:id", async (done) => {
      const res = await request(app)
        .get("/api/contacts/6078b32a8ad3ab41843877e3")
        .set("Authorization", `Bearer ${token}`); //имитация авторизации
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });

    test("should return 400 status for GET: /contacts/:id", async (done) => {
      const res = await request(app)
        .get("/api/contacts/6078b32a8ad3ab877e3")
        .set("Authorization", `Bearer ${token}`); //имитация авторизации
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();

      // expect(res.body.data.contacts._id).toBeInstanceOf(contact._id);
      done();
    });
  });

  describe("should handle POST request", () => {
    test("should return 201 status for POST: /contacts", async (done) => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json") //обозначаем, в каком формате уйдет на сервер
        .send(newContact);
      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewContact = res.body.data.contact._id;
      done();
    });

    test("should return 400 status for POST: /contacts wrong field", async (done) => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json") //обозначаем, в каком формате уйдет на сервер
        .send({ ...newContact, test: 1 });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    test("should return 400 status for POST: /contacts without field", async (done) => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json") //обозначаем, в каком формате уйдет на сервер
        .send({ name: "test" });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe("should handle PATCH request", () => {
    test("should return 200 status for PATCH: /contacts/:id", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${idNewContact}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json") //обозначаем, в каком формате уйдет на сервер
        .send({ name: "test" });

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();

      expect(res.body.data.contact.name).toBe("test");

      done();
    });

    test("should return 400 status for PATCH: /contacts/:id wrong field", async (done) => {
      const res = await request(app)
        .patch("/api/contacts/1234")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json") //обозначаем, в каком формате уйдет на сервер
        .send({ test: 1 });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    test("should return 404 status for PATCH: /contacts/:id wrong id", async (done) => {
      const res = await request(app)
        .patch("/api/contacts/1234")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json") //обозначаем, в каком формате уйдет на сервер
        .send({ name: "test" });
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      console.log(
        "🚀 ~ file: contacts.e2e.test.js ~ line 135 ~ test ~ res.body",
        res.body
      );
      done();
    });
  });

  // describe("should handle PATCH request", () => {
  //   test("should return 200 status for PATCH: /contacts/:id", async (done) => {
  //     const res = await request(app)
  //       .patch(`/api/contacts/${idNewContact}`)
  //       .set("Authorzation", `Bearer ${token}`)
  //       .set("Accept", "application/json") //обозначаем, в каком формате уйдет на сервер
  //       .send({ name: "test" });
  //     expect(res.status).toEqual(200);
  //     expect(res.body).toBeDefined();
  //     expect(res.body.data.contact.name).toBe("test");
  //     done();
  //   });

  //   test("should return 400 status for PATCH: /contacts/:id wrong field", async (done) => {
  //     const res = await request(app)
  //       .patch("/api/contacts/1234")
  //       .set("Authorzation", `Bearer ${token}`)
  //       .set("Accept", "application/json") //обозначаем, в каком формате уйдет на сервер
  //       .send({ test: 1 });
  //     expect(res.status).toEqual(400);
  //     expect(res.body).toBeDefined();
  //     done();
  //   });

  //   test("should return 404 status for PATCH: /contacts/:id ", async (done) => {
  //     const res = await request(app)
  //       .patch("/api/contacts/6078b32a8ad3ab41843877e3")
  //       .set("Authorzation", `Bearer ${token}`)
  //       .set("Accept", "application/json") //обозначаем, в каком формате уйдет на сервер
  //       .send({ age: 1 });
  //     expect(res.status).toEqual(404);
  //     expect(res.body).toBeDefined();
  //     done();
  //   });
  // });
});
