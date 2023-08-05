// "cross-env NODE_ENV=development node --experimental-vm-modules node_modules/jest/bin/jest.js";

import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";
import app from "../../app.js";
import User from "../../models/user.js";

const { DB_HOST_TEST, PORT } = process.env;

describe("test register controller", () => {
    let server=null;

    beforeAll( async () => {
        await mongoose.connect(DB_HOST_TEST);
        server = app.listen(PORT);
    });
    

    afterAll( async() => {
        await mongoose.connection.close();
        server.close();
    });

    test("test register with correct data",
        async () => {
        const signupData = {
                email: "nataliia11@gmail.com",
                password: "123456",
            };
        
        const {statusCode, body} = await request(app)
            .post("/api/users/register")
            .send(signupData);
            
        expect(statusCode).toBe(201);
        expect(body.user.email).toBe(signupData.email);
        expect(body).toMatchObject({
                user: {
                    email: expect.any(String),
                    subscription: expect.any(String),
                },
        });
        
        const user = await User.findOne({ email: signupData.email });
        expect(user.email).toBe(signupData.email);
        });
    
    test("test login with correct data",
        async () => {
            const signinData = {
                email: "nataliia11@gmail.com",
                password: "123456",
            };
            
            const {statusCode, body} = await request(app)
                .post("/api/users/login")
                .send(signinData);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty('token');
            expect(body).toMatchObject({
                user: {
                    email: expect.any(String),
                    subscription: expect.any(String),
                },
            });

            await User.deleteMany({});
    });
});

