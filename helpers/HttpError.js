const errorMessage={
    400:"Bad request",
    401:"Unauthoarized",
    403:"Forbiden",
    404:"NotFound",
    409:"Conflict",
};
export const HttpError=(status,message=errorMessage[status])=>{
    console.log(status,message)
    const error =new Error(message);
    error.status=status;
    return error;
};