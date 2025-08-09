const jwt = require("jsonwebtoken");

function setUser(user) {
    return jwt.sign({
        id : user._id,
        email : user.email,
        role : user.role
    } ,process.env.JWT_SECRET_KEY);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return null; 
    }
}

module.exports = {
    setUser,
    getUser
};