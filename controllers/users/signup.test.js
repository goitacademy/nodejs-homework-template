const express = require("express");
const mongoose = require("mongoose");
const supertest = require("supertest");
const signup = require("./signup");

const app = express();

// app.post("/api/signup", signup);

const userid = new mongoose.Types.ObjectId().toString();
const userPayload = {
    _id: userid,
    email: "mama@gmail.com",
    password: "123212",
}

//ответ должен иметь статус-код 200
//в ответе должен возвращаться токен
//в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

describe("test signup controller", ()=> {
    beforeAll(()=> app.listen(3000));

    test("response status 200", async()=> {

        const {statusCode, body} = await supertest(app).post("/api/signup");
        
        expect(statusCode).toBe(200);
        expect(body).toEqual(userPayload);
        
    })

})