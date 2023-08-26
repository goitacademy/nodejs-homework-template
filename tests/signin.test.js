// const Jest = require("jest");
const express = require("express");
const request = require("supertest");
const { getAll } = require("../controllers/contacts");

const app = express();

app.get("/api/contacts", getAll);

describe("testing", () => {
  beforeAll(() => app.listen(3000));

  test("return email and subscibe test", async () => {
    const response = await request(app).get("/api/contacts/");
    console.log("RESPONSE", response.status);
    expect(response.status).toBe(200);
  });
});

//   afterAll(() => app.close());
