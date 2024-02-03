import jwt from "jsonwebtoken";

const payload = {
    id: "fwefwefwef",
    username: "John"
}

const secret = "dasdasdasd"

const token = jwt.sign(payload, secret, { expiresIn: '12h' }) 
console.log(token)



try {
    const verify = jwt.verify(token, secret);
} catch (e) {
console.log(e)
}