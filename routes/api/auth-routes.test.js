const mongoose = require("mongoose");
const request = require("supertest");
const { describe, beforeAll, afterAll, afterEach, test, expect } = require("@jest/globals");

const app = require("../../app");

const {User} = require("../../models/user");

const {DB_HOST_TEST, PORT} = process.env;

describe("test /users/login route", () => {
    let server = null;
    beforeAll(async() => {
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST_TEST);

        const user = new User({
            "email": "anna@gmail.com",
            "password": "$2a$10$TZypCQIZrLPVgbtvt85cK.qwSRM9/SbUX08uaTt78S/lfs0McHOvK",
            "subscription": "starter",
            "token": "",
            "avatarURL": "//www.gravatar.com/avatar/c3a724f59d3245b0e166b278f809a9c7"
        });
        await user.save();
        
    });

    afterAll(async()=> {
        server.close();
        await mongoose.connection.close();
    });

    afterEach(async()=> {
        await User.deleteMany({});
    })

    test("test login route with correct data", async() => {
        const loginData = {
            "email": "anna@gmail.com",
            "password": "123456"
        }

        const res = await request(app).post("/users/login").send(loginData);
        expect(res.statusCode).toBe(200);
        
        const user = await User.findOne({email: loginData.email});
        expect(res.body.token).toBe(user.token);

        expect(res.body.user).toMatchObject({
            email: expect.any(String),
            subscription: expect.any(String)
        });

        expect(res.body.user.email).toBe(loginData.email);
        expect(res.body.user.subscription).toBe("starter");

    })
})



