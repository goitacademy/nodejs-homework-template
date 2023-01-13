const register = require("./register");

const express = require("express");

const request = require("supertest");

const app = express();

app.post("/api/users/signup", register);

describe("test register controllers", () => {
    beforeAll(() => app.listen(3000));
    afterAll(() => app.close());


    test("register array of user", async () => {
        const response = await request(app).post("/api/users/signup");
        console.log(response.status);
    })
})

// const register = require("./register");
// const User = require("../../models/users");
// const express = require("express");

// const request = require("supertest");

// const app = express();

// app.post("/api/users/signup", register);

// describe("test register controllers", () => {
//     beforeAll(() => app.listen(3000));
//     // afterAll(() => app.close());
  
//     it("register array of user", async () => {
          
        // const email = "olena@gmail.com";
        // const password = "11111";
        // const subscription = "pro";
        
        
        // const req = {
        //     body: {
        //         email: email,
        //         password: password,
        //         subscription: subscription
        //     }
        // };


        // jest.spyOn(User, 'findOne').mockImplementation(async() => (req));
    //     const response = await (await request(app).post("/api/users/signup")).send({
    //         user: {
    //             email: "olena@gmail.com",
    //             password: "11111",
    //             subscription: "pro"
    //         }
    //     })
       
    //     // const response = await register(req)
    //      console.log(response.status);
   
    // })
// }, 7000)