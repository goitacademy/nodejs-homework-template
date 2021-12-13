const request = require("supertest");
const fs = require("fs").promises;
require("dotenv").config();

const db = require("../config/db");
const app = require("../app");

const User = require("../model/user");
const { newUserForRouteUser } = require("./data/data");

jest.mock("cloudinary");

describe("Test route users", () => {
  let token;

  beforeAll(async () => {
    await db;
    await User.deleteOne({ email: newUserForRouteUser.email });
  });

  afterAll(async () => {
    const mongo = await db;
    await User.deleteOne({ email: newUserForRouteUser.email });
    await mongo.disconnect();
  });

  describe("Register user", () => {
    it("should sign up user and return status 201", async () => {
      const response = await request(app)
        .post("/api/users/signup")
        .send(newUserForRouteUser)
        .set("Accept", "application/json");

      expect(response.status).toEqual(201);
      expect(response.body).toBeDefined();
    });

    it("should return status 409 if user already exists", async () => {
      const response = await request(app)
        .post("/api/users/signup")
        .send(newUserForRouteUser)
        .set("Accept", "application/json");

      expect(response.status).toEqual(409);
      expect(response.body).toBeDefined();
    });
  });

  describe("User authorization", () => {
    it("should login user and return status 200", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send(newUserForRouteUser)
        .set("Accept", "application/json");

      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      token = response.body.date.token;
    });

    it("should return status 401 for unauthorized user", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send({ email: "fake@gmail.com", password: "12345678" })
        .set("Accept", "application/json");

      expect(response.status).toEqual(401);
      expect(response.body).toBeDefined();
    });
  });

  describe("User avatar uploading", () => {
    it("should upload avatar for user and return status 200", async () => {
      const buffer = await fs.readFile("./test/data/test-avatar.jpg");
      const response = await request(app)
        .patch("/api/users/avatars")
        .set("Authorization", `Bearer ${token}`)
        .attach("avatar", buffer, "test-avatar.jpg");

      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
      console.log(response.body);
    });
  });

  describe("Update subscription", () => {
    it("should update subscription and return status 200", async () => {
      const response = await request(app)
        .patch("/api/users/subscription")
        .set("Authorization", `Bearer ${token}`)
        .send({ subscription: "business" });

      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("Getting a current user data by token", () => {
    it("should get a current user and return status 200", async () => {
      const response = await request(app)
        .get("/api/users/current")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("User logout", () => {
    it("should log out user and return status 204", async () => {
      const response = await request(app)
        .post("/api/users/logout")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(204);
    });

    it("should return status 401 if user token is wrong", async () => {
      const wrongToken = "123445677889";
      const response = await request(app)
        .post("/api/users/logout")
        .set("Authorization", `Bearer ${wrongToken}`);

      expect(response.status).toEqual(401);
    });
  });
});