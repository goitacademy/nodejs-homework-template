const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require('bcryptjs');

const app = require("../app");

const {User} = require("../models/user");
const {DB_HOST_TEST, PORT} = process.env;

describe("test routes", () => {
    let server = null;
    beforeAll(async()=> {
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST_TEST);
    });

    afterAll(async()=> {
        server.close();
        await mongoose.connection.close();
    });

    afterEach(async()=> {
        await User.deleteMany({});
    });

    test("test login route", async () => {
        const password = await bcrypt.hash("123456", 10);
        const newUser = {
            name: "Test",
            email: "vimor58046@scubalm.com",
            password: password,
            subscription: "starter",
            avatarURL: "//www.gravatar.com/avatar/b18b1b75aa505dab07086d7e1aa2909e",
        };

        const user = await User.create(newUser);

        const loginUser = {
            email: "vimor58046@scubalm.com",
            password: "123456",
        };

        const res = await request(app).post("/api/auth/login").send(loginUser);
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeTruthy();
        const {token} = await User.findById(user._id);
        expect(res.body.token).toBe(token);        
        expect(res.body.user).toHaveProperty("email");
        expect (res.body.user).toHaveProperty("subscription");   
        expect(typeof res.body.user.email).toBe("string");
        expect (typeof res.body.user.subscription).toBe("string");
    });

    test("test register route with correct data", async() => {
        const registerData = {
            name: "Test",
            email: "vimor58046@scubalm.com",
            password: "123456"
        };

        const res = await request(app).post("/api/auth/register").send(registerData);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(registerData.name);
        expect(res.body.email).toBe(registerData.email);
        const user = await User.findOne({email: registerData.email});
        expect(user.name).toBe(registerData.name);
    });
})