import jwt  from "jsonwebtoken"

const {JWT_SECRET} = process.env

import User from "../../../models/User.js"


const authenticate = async(req, res, next) => {
    const { authorization = ""} = req.headers
    const [bearer, token] = authorization.split(" ")
    if (bearer !== "Bearer") {
         res.status(401).json({
            "massage": "not found1"
        })
    }
    try {
        const {id} = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(id)
        if (!user || !user.token) {
            res.status(401).json({
                "massage": "not found2"
            })
        } 
             req.user = user
             next()
    } catch (error) {
        res.status(401).json({
            "massage": "not found3"
        })
    }
}

export default authenticate