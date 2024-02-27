require("dotenv/config");
const jwt = require("jsonwebtoken");

const verifyJwt = (request, response, next) => {
    const token = request.headers["x-access-token"];

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if(error) {
                console.log(error, " Error to verify JWT token...");

                response.status(404).json({message: "Fail to verify token !"});
            }

            request.userId = decoded.id;
            next();
        });
    }
    else {
        response.status(404).json({message: "Token not provided !"});
    }
}

module.exports = verifyJwt;