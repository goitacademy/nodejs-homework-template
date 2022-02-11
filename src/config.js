exports.getConfig=()=>{
    return{
        port: process.env.PORT||8080,
        allowedCorsOrigin:process.env.ALLOWED_CORS_ORIGIN
    }
}

