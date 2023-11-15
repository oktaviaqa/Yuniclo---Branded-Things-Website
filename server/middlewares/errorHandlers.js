async function Error (err, req, res, next){
    let status = 500
    let message = 'Internal Server Error'

    if (err.name === "SequelizeValidationError") {
        status = 400
        message = err.errors[0].message
    } else if (err.name === "JsonWebTokenError") {
        status = 401
        message = "Invalid token"
    } else if (err.name === "Invalid password or username") {
        status = 401
        message = 'Invalid email or password'
    } else if (err.name === "unauthenticated") {
        status = 401
        message = 'unauthenticated'
    } else if (err.name === "not found") {
        status = 401
        message = 'not found'
    } else if (err.name === "forbidden") {
        status = 403
        message = 'forbidden'
    } else if (err.name === "SequelizeUniqueConstraintError") {
        status = 400
        message = 'Email is already exists' // Ubah pesan kesalahan ke "Email is already exists"
    }
    
    console.log(err);
    res.status(status).json({message})
}

module.exports = Error