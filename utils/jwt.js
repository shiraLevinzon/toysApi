const jwt = require("jsonwebtoken");

const jwtSecret = '123@@';
exports.generateToken = (payload) => {
    try {
        const token = jwt.sign({ ...payload }, jwtSecret, { expiresIn: '2h' });
        return token
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.decodeToken = (token) => {
    try {
        const payload = jwt.verify(token, jwtSecret);
        return payload;
    }
    catch (error) {
        throw Error(error.message);
    }
}