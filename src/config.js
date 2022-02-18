exports.getConfig=()=>{
    return{
        port: process.env.PORT||8080,
        allowedCorsOrigin:process.env.ALLOWED_CORS_ORIGIN,
        dbUrl:process.env.MONGODB_URI
    }
}

