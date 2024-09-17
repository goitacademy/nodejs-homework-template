const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const {User} = require("../../models/user")

const {DB_TEST_HOST, PORT = 3000} = process.env;

describe("test /users/register route", ()=> {
    jest.setTimeout(10000);
    let server = null
    beforeAll(async ()=> {
        await mongoose.connect(DB_TEST_HOST);
        server = app.listen(PORT);
    })
    afterAll(async ()=>{
       await mongoose.connection.close()
       server.close()
    })

    afterEach(async()=> {
        await User.deleteMany()
    })

    test("test /users/register with correctData", async () => {
        const singnupData = {
            email: "SupperC@gmail.com",
            password: "123456"
        };
        const {body, statusCode} = await request(app).post("/users/register").send(singnupData)
        
        expect(statusCode).toBe(201)
        expect(body.user.email).toBe(singnupData.email)
        
        const user = await User.findOne({email: singnupData.email})
        expect(user.email).toBe(singnupData.email)
    })
})